<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step @click="step = 1" :complete="step > 1" step="1">
          Hive
        </v-stepper-step>
        <v-stepper-step @click="go_to(2)" :complete="step > 2" step="2">
          Frame(s)
        </v-stepper-step>
        <v-stepper-step @click="go_to(3)" :complete="step > 3" step="3">
          Queen
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="hive_info" @submit.prevent>
            <v-card>
              <v-row>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="hive.feedName"
                    :items="feedList"
                    label="Sigfox Name"
                    clearable
                    deletable-chips
                    solo
                  ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Hive Type"
                    v-model="hive.hiveType"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="date"
                    label="Start Date"
                    v-model="hive.startDate"
                    :rules="rules.date"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Super"
                    v-model="hive.super"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Queen Excluder"
                    v-model="hive.queenExcluder"
                    outlined
                    :rules="rules.string"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Bottom Board"
                    v-model="hive.bottomBoard"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Feeder"
                    v-model="hive.feeder"
                    outlined
                    :rules="rules.string"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form ref="frame_info" @submit.prevent>
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Add a Frame
                </v-btn>
              </template>
              <v-card>
                <framePopup :frame="frame" />
                <v-card-action>
                  <v-btn color="primary" text @click="addFrame()">
                    Save Your Frame
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-action>
              </v-card>
            </v-dialog>
            <v-container>
              <v-list rounded>
                <v-subheader>Your Hive's Frame(s)</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item v-for="(frame, i) in hive.frames" :key="i">
                    <v-list-item-content justify="center">
                      <v-list-item-title>Frame {{ i }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Deposit Date: ${frame.depositDate}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        >Waxed: ${frame.waxed}</v-list-item-subtitle
                      ><v-list-item-subtitle
                        >Honey: ${frame.honey}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Pollen: ${frame.pollen}</v-list-item-subtitle
                      ><v-list-item-subtitle
                        >Brood: ${frame.brood}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Frame Condition:
                        ${frame.frameCondition}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        @click="removeFrame(i)"
                        ><v-icon dark> mdi-minus </v-icon></v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-form ref="queen_info" @submit.prevent>
            <v-card>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Genetic Code"
                    v-model="hive.queen.geneticCode"
                    :rules="rules.string"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Marked"
                    v-model="hive.queen.marked"
                    outlined
                    :rules="rules.string"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    type="text"
                    label="Clipped"
                    v-model="hive.queen.clipped"
                    outlined
                    required
                    :rules="rules.string"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    type="date"
                    label="Birth Date"
                    v-model="hive.queen.birthDate"
                    outlined
                    :rules="rules.date"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn color="primary" text @click="addHive()">
                Save Your Hive
              </v-btn>
            </v-card>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import hives from "../pages/hives.vue";
export default {
  props: ["apiary", "hive", "feedList"],
  data() {
    return {
      selectedItem: "",
      dialog: false,
      step: 1,
      frame: {
        depositDate: null,
        waxed: "",
        honey: "",
        pollen: "",
        brood: "",
        frameCondition: "",
      },
      rules: {
        date: [(value) => !!value || "Field Required!"],
        string: [(value) => (value || "").trim().length || "Field Required!"],
        number: [
          (value) => (value || "").trim().length || "Field Required!",
          (value) => value >= 0 || "The number must be positive",
        ],
      },
    };
  },

  methods: {
    addHive() {
      this.hive.apiary = this.apiary;
      this.$post("/hive", this.hive)
        .then((res) => {
          if (res.data.success) {
            this.dialog = false;
            console.log("success");
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
    addFrame() {
      this.hive.frames.push(this.frame);
      this.resetFrameInputs();
      this.dialog = false;
    },
    removeFrame(index) {
      this.hive.frames.splice(index, 1);
    },
    resetInputs() {
      this.hive = {
        queen: {
          geneticCode: "",
          marked: "",
          clipped: "",
          birthDate: null,
        },
        frames: [],
        hiveType: "",
        apiary: "",
        startDate: null,
        super: "",
        queenExcluder: "",
        bottomBoard: "",
        feeder: "",
      };
    },
    resetFrameInputs() {
      this.frame = {
        depositDate: null,
        waxed: "",
        honey: "",
        pollen: "",
        brood: "",
        frameCondition: "",
      };
    },
    go_to(val) {
      if (val == 2) {
        if (this.$refs.hive_info.validate()) {
          this.step = val;
        } else
          this.$notify({
            label: "Error",
            text: "You have not filled all the fields!",
            type: "error",
            showAnimation: "slideDown",
          });
      } else if (val == 3) {
        if (this.hive.frames.length) {
          this.step = val;
        } else
          this.$notify({
            label: "Error",
            text: "You have not filled all the fields!",
            type: "error",
            showAnimation: "slideDown",
          });
      }
    },
    // this.$refs.hive_info.validate()
  },
};
</script>
