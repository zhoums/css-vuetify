// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '../../components/VBtn'
import { VDefaultsProvider } from '../../components/VDefaultsProvider'
import { VDivider } from '../../components/VDivider'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useForm } from '@/composables/form'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, watchEffect } from 'vue'
import { clamp, genericComponent, getDecimals, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

type ControlSlot = {
  click: (e: MouseEvent) => void
}

type VNumberInputSlots = Omit<VTextFieldSlots, 'default'> & {
  increment: ControlSlot
  decrement: ControlSlot
}

type ControlVariant = 'default' | 'stacked' | 'split'

const makeVNumberInputProps = propsFactory({
  controlVariant: {
    type: String as PropType<ControlVariant>,
    default: 'default',
  },
  inset: Boolean,
  hideInput: Boolean,
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },

  ...omit(makeVTextFieldProps(), ['appendInnerIcon', 'prependInnerIcon']),
}, 'VNumberInput')

export const VNumberInput = genericComponent<VNumberInputSlots>()({
  name: 'VNumberInput',

  props: {
    ...makeVNumberInputProps(),
  },

  emits: {
    'update:modelValue': (val: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')

    const stepDecimals = computed(() => getDecimals(props.step))
    const modelDecimals = computed(() => model.value != null ? getDecimals(model.value) : 0)

    const form = useForm()
    const controlsDisabled = computed(() => (
      props.disabled || props.readonly || form?.isReadonly.value
    ))

    const canIncrease = computed(() => {
      if (controlsDisabled.value) return false
      if (model.value == null) return true
      return model.value + props.step <= props.max
    })
    const canDecrease = computed(() => {
      if (controlsDisabled.value) return false
      if (model.value == null) return true
      return model.value - props.step >= props.min
    })

    watchEffect(() => {
      if (controlsDisabled.value) return
      if (model.value != null && (model.value < props.min || model.value > props.max)) {
        model.value = clamp(model.value, props.min, props.max)
      }
    })

    const controlVariant = computed(() => {
      return props.hideInput ? 'stacked' : props.controlVariant
    })

    const incrementSlotProps = computed(() => ({ click: onClickUp }))

    const decrementSlotProps = computed(() => ({ click: onClickDown }))

    function toggleUpDown (increment = true) {
      if (controlsDisabled.value) return
      if (model.value == null) {
        model.value = 0
        return
      }

      const decimals = Math.max(modelDecimals.value, stepDecimals.value)
      if (increment) {
        if (canIncrease.value) model.value = +(((model.value + props.step).toFixed(decimals)))
      } else {
        if (canDecrease.value) model.value = +(((model.value - props.step).toFixed(decimals)))
      }
    }

    function onClickUp (e: MouseEvent) {
      e.stopPropagation()
      toggleUpDown()
    }

    function onClickDown (e: MouseEvent) {
      e.stopPropagation()
      toggleUpDown(false)
    }

    function onKeydown (e: KeyboardEvent) {
      if (
        ['Enter', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Tab'].includes(e.key) ||
        e.ctrlKey
      ) return

      if (['ArrowDown'].includes(e.key)) {
        e.preventDefault()
        toggleUpDown(false)
        return
      }
      if (['ArrowUp'].includes(e.key)) {
        e.preventDefault()
        toggleUpDown()
        return
      }

      // Only numbers, +, - & . are allowed
      if (!/^[0-9\-+.]+$/.test(e.key)) {
        e.preventDefault()
      }
    }

    function onModelUpdate (v: string) {
      model.value = v ? +(v) : undefined
    }

    function onControlMousedown (e: MouseEvent) {
      e.stopPropagation()
    }

    useRender(() => {
      const { modelValue: _, ...textFieldProps } = VTextField.filterProps(props)

      function controlNode () {
        const defaultHeight = controlVariant.value === 'stacked' ? 'auto' : '100%'
        return (
          <div class="v-number-input__control">
            {
              !slots.decrement ? (
                <VBtn
                  disabled={ !canDecrease.value }
                  flat
                  key="decrement-btn"
                  height={ defaultHeight }
                  name="decrement-btn"
                  icon="$expand"
                  size="small"
                  tabindex="-1"
                  onClick={ onClickDown }
                  onMousedown={ onControlMousedown }
                />
              ) : (
                <VDefaultsProvider
                  key="decrement-defaults"
                  defaults={{
                    VBtn: {
                      disabled: !canDecrease.value,
                      flat: true,
                      height: defaultHeight,
                      size: 'small',
                      icon: '$expand',
                    },
                  }}
                >
                  { slots.decrement(decrementSlotProps.value) }
                </VDefaultsProvider>
              )
            }

            <VDivider
              vertical={ controlVariant.value !== 'stacked' }
            />

            {
              !slots.increment ? (
                <VBtn
                  disabled={ !canIncrease.value }
                  flat
                  key="increment-btn"
                  height={ defaultHeight }
                  name="increment-btn"
                  icon="$collapse"
                  onClick={ onClickUp }
                  onMousedown={ onControlMousedown }
                  size="small"
                  tabindex="-1"
                />
              ) : (
                <VDefaultsProvider
                  key="increment-defaults"
                  defaults={{
                    VBtn: {
                      disabled: !canIncrease.value,
                      flat: true,
                      height: defaultHeight,
                      size: 'small',
                      icon: '$collapse',
                    },
                  }}
                >
                  { slots.increment(incrementSlotProps.value) }
                </VDefaultsProvider>
              )
            }
          </div>
        )
      }

      function dividerNode () {
        return !props.hideInput && !props.inset ? <VDivider vertical /> : undefined
      }

      const appendInnerControl =
        controlVariant.value === 'split'
          ? (
            <div class="v-number-input__control">
              <VDivider vertical />

              <VBtn
                flat
                height="100%"
                icon="$plus"
                tile
                tabindex="-1"
                onClick={ onClickUp }
                onMousedown={ onControlMousedown }
              />
            </div>
          ) : (!props.reverse
            ? <>{ dividerNode() }{ controlNode() }</>
            : undefined)

      const hasAppendInner = slots['append-inner'] || appendInnerControl

      const prependInnerControl =
        controlVariant.value === 'split'
          ? (
            <div class="v-number-input__control">
              <VBtn
                flat
                height="100%"
                icon="$minus"
                tile
                tabindex="-1"
                onClick={ onClickDown }
                onMousedown={ onControlMousedown }
              />

              <VDivider vertical />
            </div>
          ) : (props.reverse
            ? <>{ controlNode() }{ dividerNode() }</>
            : undefined)

      const hasPrependInner = slots['prepend-inner'] || prependInnerControl

      return (
        <VTextField
          modelValue={ model.value }
          onUpdate:modelValue={ onModelUpdate }
          onKeydown={ onKeydown }
          class={[
            'v-number-input',
            {
              'v-number-input--default': controlVariant.value === 'default',
              'v-number-input--hide-input': props.hideInput,
              'v-number-input--inset': props.inset,
              'v-number-input--reverse': props.reverse,
              'v-number-input--split': controlVariant.value === 'split',
              'v-number-input--stacked': controlVariant.value === 'stacked',
            },
            props.class,
          ]}
          { ...textFieldProps }
          style={ props.style }
          inputmode="decimal"
        >
          {{
            ...slots,
            'append-inner': hasAppendInner ? (...args) => (
              <>
                { slots['append-inner']?.(...args) }
                { appendInnerControl }
              </>
            ) : undefined,
            'prepend-inner': hasPrependInner ? (...args) => (
              <>
                { prependInnerControl }
                { slots['prepend-inner']?.(...args) }
              </>
            ) : undefined,
          }}
        </VTextField>
      )
    })
  },
})

export type VNumberInput = InstanceType<typeof VNumberInput>
