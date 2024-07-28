<template>
  <v-card>
    <v-card-title>
      <span>Frame</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="Waxed"
              v-model="frame.waxed"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="6">
            <v-text-field
              type="date"
              label="Deposit Date"
              v-model="frame.depositDate"
              outlined
              :rules="rules.date"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="Honey"
              v-model="frame.honey"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="Pollen"
              v-model="frame.pollen"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="string"
              label="Brood"
              v-model="frame.brood"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="6">
            <v-text-field
              type="text"
              label="State"
              v-model="frame.frameState"
              outlined
              :rules="rules.string"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import hivePopup from './ruchePopup.vue';

export default {
  props: ["frame"],
  data() {
    return {
      rules: {
        date: [(value) => !!value || "Field Required!"],
        string: [(value) => (value || "").trim().length || "Field required!"],
        number: [
          (value) => (value || "").trim().length || "Field required!",
          (value) => value >= 0 || "The number must be positive",
        ],
      },
    };
  },
  methods: {},
};
</script>
