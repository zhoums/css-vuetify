<template>
  <v-app>
    <div class="d-flex flex-wrap pa-3">
      <v-card width="400" class="ma-2">
        <template v-slot:title> This is Button </template>

        <template v-slot:text>
          <v-btn color="golden">button</v-btn>
          <v-btn class="mx-4" color="golden-2">button</v-btn>

          <v-row class="my-2"></v-row>

          <v-btn-toggle
            v-model="toggle"
            color="primary"
            variant="outlined"
            mandatory
          >
            <v-btn icon="mdi-format-align-left" value="1"></v-btn>
            <v-btn icon="mdi-format-align-center" value="2"></v-btn>
            <v-btn icon="mdi-format-align-right" value="3"></v-btn>
            <v-btn icon="mdi-format-align-justify" value="4"></v-btn>
          </v-btn-toggle>
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
      </v-card>
    </div>
  </v-app>
</template>

<script setup>
import { ref, reactive } from "vue";
const toggle = ref("2");
</script>
