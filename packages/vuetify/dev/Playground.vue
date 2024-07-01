<template>
  <v-app>
    <div class="d-flex flex-wrap pa-3">
      <v-card width="400" class="ma-2">
        <template v-slot:title> This is Button </template>

        <template v-slot:text>
          <v-btn color="golden" prepend-icon="mdi-airplane">button</v-btn>
          <v-btn class="mx-4" color="golden">button</v-btn>
          <v-btn class="mx-4" color="golden-2">button</v-btn>

          <v-row class="my-2"></v-row>

          <v-btn-toggle
            v-model="toggle"
            color="primary"
            variant="outlined"
            mandatory
          >
            <v-btn prepend-icon="mdi-format-align-left" value="1">Button</v-btn>
            <v-btn prepend-icon="mdi-format-align-right" value="3">
              Button
            </v-btn>
            <v-btn prepend-icon="mdi-format-align-justify" value="4">
              Button
            </v-btn>
          </v-btn-toggle>

          <h3 class="mt-4">This is Tooltip</h3>
          <v-row class="ma-4">
            <v-tooltip v-model="showTip" location="left">
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                  <v-icon color="grey-lighten-1"> mdi-cart </v-icon>
                </v-btn>
              </template>
              <span>Programmatic tooltip</span>
            </v-tooltip>
          </v-row>
          <div class="d-flex justify-space-around">
            <v-btn>
              End
              <v-tooltip activator="parent" location="end">Tooltip</v-tooltip>
            </v-btn>

            <v-btn>
              Top
              <v-tooltip activator="parent" location="top">Tooltip</v-tooltip>
            </v-btn>

            <v-btn>
              Bottom
              <v-tooltip activator="parent" location="bottom"
                >Tooltip</v-tooltip
              >
            </v-btn>
            <v-btn>
              Start
              <v-tooltip activator="parent" location="start">Tooltip</v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-card>

      <v-card width="400" class="ma-2">
        <template v-slot:title> This is Field </template>
        <template v-slot:text>
          <v-text-field model-value="John Doe" disabled></v-text-field>
          <v-text-field
            model-value="John Doe"
            readonly
            density="comfortable"
          ></v-text-field>
          <v-text-field
            model-value="John Doe"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-textarea variant="outlined"></v-textarea>
        </template>
      </v-card>
      <v-card width="400" class="ma-2">
        <v-checkbox color="primary" label="Checkbox"></v-checkbox>
        <v-radio-group>
          <v-radio color="primary" label="Radio One" value="one"></v-radio>
          <v-radio color="primary" label="Radio two" value="two"></v-radio>
        </v-radio-group>
        <v-switch
          inset
          flat
          density="compact"
          class="mx-2"
          color="golden"
          label="Switch"
        ></v-switch>
        <v-row class="ma-0 mx-3">
          <v-slider
            v-model="slider"
            step="2"
            color="golden"
            min="0"
            max="50"
          ></v-slider>
        </v-row>
      </v-card>
      <v-card width="400" class="ma-2">
        <h3 class="mt-4">This is Tabs</h3>
        <v-tabs dark v-model="tab" color="primary">
          <v-tab value="one">Item One</v-tab>
          <v-tab value="two">Item Two</v-tab>
          <v-tab value="three">Item Three</v-tab>
        </v-tabs>
        <h3 class="mt-4">This is Breadcrumbs</h3>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon color="primary" icon="mdi-chevron-right"></v-icon>
          </template>
          <template v-slot:title="{ item }">
            <template v-if="item.title === 'Home'">
              <v-icon color="primary" size="24" icon="mdi-home"></v-icon>
            </template>
            <template v-else>
              {{ item.title }}
            </template>
          </template>
        </v-breadcrumbs>
        <div class="mt-3 px-3" style="position: relative">
          <h3 class="my-1">This is Floating Button</h3>
          <v-speed-dial location="left bottom" transition="scale-transition">
            <template v-slot:activator="{ props: activatorProps }">
              <v-fab
                v-bind="activatorProps"
                size="large"
                icon="$vuetify"
              ></v-fab>
            </template>

            <v-btn key="1" icon="$success"></v-btn>
            <v-btn key="2" icon="$info"></v-btn>
            <v-btn key="3" icon="$warning"></v-btn>
            <v-btn key="4" icon="$error"></v-btn>
          </v-speed-dial>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script setup>
import { ref, reactive } from "vue";
const toggle = ref("2");
const tab = ref("");
const slider = ref(2);
const showTip = ref(false);
const breadcrumbs = ref([
  {
    title: "Home",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Link 1",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
  {
    title: "Link 2",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
]);
</script>
