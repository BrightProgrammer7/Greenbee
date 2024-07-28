<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <!-- <v-card>
        <v-card-title>
          <span>Apiary</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4" sm="6">
                <v-text-field
                  type="text"
                  label="Location"
                  v-model="apiary.location"
                  placeholder="Location"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="primary" text @click="dialog = false">
              Add a hive
            </v-btn>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
          <v-btn color="primary" text @click="addElements()">
            Save Your Apiary
          </v-btn>
        </v-card-actions>
      </v-card> -->
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["apiary", "add"],
  data: () => ({
    dialog: false,
  }),
  computed: {
    addElements() {
      this.add();
      this.dialog = false;
    },
  },
};
</script>
