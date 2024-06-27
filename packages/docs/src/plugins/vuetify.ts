// Styles
import 'vuetify/styles'

// Imports
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

// Icons
import { fa } from 'vuetify/iconsets/fa'
import { md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi-svg'
import * as mdiSvg from './icons'

// Locales
import { en, sv } from 'vuetify/locale'

// Types
import type { App } from 'vue'
import type { IconProps } from 'vuetify'

export function installVuetify (app: App) {
  const vuetify = createVuetify({
    aliases: {
      BorderChip: components.VChip,
      NewInChip: components.VChip,
      PageFeatureChip: components.VChip,
      PrimaryBtn: components.VBtn,
      SettingsSwitch: components.VSwitch,
    },
    components: {
      ...components,
      ...labs,
    },
    directives,
    defaults: {
      global: {
        eager: false,
      },
      NewInChip: {
        appendIcon: 'mdi-page-next',
        class: 'ms-2 text-mono',
        color: 'success',
        label: true,
        size: 'small',
        tag: 'div',
        variant: 'flat',

        VIcon: {
          class: 'ms-2',
          size: 'small',
        },
      },
      PageFeatureChip: {
        variant: 'tonal',
        border: true,
        class: 'text-medium-emphasis me-2 mb-2',
        size: 'small',
      },
      PrimaryBtn: {
        border: true,
        class: 'text-none',
        color: 'primary',
        slim: true,
        size: 'small',
        variant: 'outlined',

        VProgressCircular: {
          indeterminate: true,
          size: 16,
          width: 1,
        },
      },
      SettingsSwitch: {
        class: 'ps-1 mb-2',
        color: 'primary',
        density: 'compact',
        inset: true,
        trueIcon: 'mdi-check',
        falseIcon: '$close',
      },
      BorderChip: {
        border: true,
        label: true,
        size: 'small',
        variant: 'text',

        VIcon: {
          color: 'medium-emphasis',
          size: 'small',
        },
      },
    },
    locale: {
      locale: 'en',
      messages: {
        en,
        sv,
      },
    },
    icons: {
      defaultSet: 'mdi',
      sets: {
        fa,
        md,
        mdiSvg: mdi,
        mdi: {
          component: (props: IconProps) => {
            const icon = mdiSvg[camelize(props.icon as string) as keyof typeof mdiSvg]
            return h(components.VSvgIcon, { ...props, icon })
          },
        },
      },
      aliases: {
        /* eslint-disable max-len */
        x: ['M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z'],
        /* eslint-enable max-len */
      },
    },
    theme: {
      themes: {
        light: {
          colors: {
            'surface-variant-alt': '#dedede',
            primary: '#1867c0',
            secondary: '#5CBBF6',
            tertiary: '#E57373',
            accent: '#005CAF',
            quarternary: '#B0D1E8',
            'surface-bright': '#fafafa',
          },
        },
        dark: {
          colors: {
            'surface-variant-alt': '#333333',
            primary: '#2196F3',
            secondary: '#424242',
            tertiary: '#E57373',
            accent: '#FF4081',
            quarternary: '#B0D1E8',
            'surface-bright': '#474747',
          },
        },
        blackguard: {
          dark: true,
          colors: {
            background: '#0f0c24',
            primary: '#e7810d',
            surface: '#1e184a',
            'on-surface-variant': '#4c219e',
            info: '#9c27b0',
            accent: '#FF4081',
            success: '#84b38a',
            'surface-bright': '#362b89',
          },
          variables: {
            'theme-code': '#15123d',
          },
        },
      },
    },
  })
  app.use(vuetify)
}
