<template>
  <v-card>
    <v-card-title>
      <span>Apiary</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4" sm="6">
            <v-text-field
              type="string"
              label="Location"
              v-model="apiary.location"
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
export default {
  props: {
    apiary: Object,
    hive: Object,
  },
  data() {
    return {
      dialogHive: false,
      selectedItem: "",

      rules: {
        date: [(value) => !!value || "Field Required!"],
        string: [
          (value) => (value || "").trim().length || "Field required!",
        ],
        number: [
          (value) => (value || "").trim().length || "Field required!",
          (value) => value >= 0 || "The number must be positive",
        ],
      },
    };
  },
  methods: {
    addHive() {
      this.$post("/hive", this.hive)
        .then((res) => {
          if (res.data.success) {
            this.dialog = false;
            console.log("done");
            this.resetInputs();
            this.$notify({
              text: res.data.message,
              type: "success",
              showAnimation: "slideDown",
            });
          } else
            this.$notify({
              label: "Error",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
        })
        .catch((err) => {
          this.$notify({
            label: "Error",
            text: err,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    removeHive(index) {
      this.apiary.hives.splice(index, 1);
    },
  },
};
</script>
