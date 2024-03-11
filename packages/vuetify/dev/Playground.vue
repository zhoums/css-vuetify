<template>
  <v-app>
    <v-container class="d-flex">
      <v-card width="400">
        <template v-slot:title> This is Button </template>

        <template v-slot:text>
          <v-btn color="golden">button</v-btn>
          <v-btn class="mx-4" color="golden-2">button</v-btn>
        </template>
      </v-card>

      <v-card width="400" class="mx-4">
        <template v-slot:title> This is Field </template>
        <template v-slot:text>
          <v-row>
            <v-col cols="4">
              <v-text-field model-value="John Doe" disabled></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field model-value="John Doe" readonly></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                model-value="John Doe"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row> </v-row>
        </template>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Playground",
  setup() {
    return {
      //
    };
  },
};
</script>
