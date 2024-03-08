<template>
  <v-app>
    <v-container>
      <v-card width="400">
        <template v-slot:title> This is a Button </template>

        <template v-slot:subtitle> This is a subtitle </template>

        <template v-slot:text>
          <v-btn color="golden">55dfsda5</v-btn>
          <v-btn color="golden-2">555</v-btn>
        </template>
      </v-card>

      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Regular"
            model-value="John Doe"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            model-value="John Doe"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
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
