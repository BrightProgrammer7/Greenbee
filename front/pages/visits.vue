<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="headline"> Visit Manager </v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-subheader>Visits</v-subheader>
            <v-container v-if="visit_mode">
              <v-row justify="space-between" align="flex-start">
                <v-col cols="3">
                  <v-list-item-group v-model="selectedItem" color="primary">
                    <v-list-item v-for="(visit, i) of visits" :key="i">
                      <v-list-item-content
                        @click="
                          selectedCard && selectedCard == visit
                            ? closeCard()
                            : showInfo(visit)
                        "
                      >
                        <v-list-item-title
                          v-text="visit.ref"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-col>
                <v-col cols="8">
                  <v-card v-if="selectedCard">
                    <v-card-title class="headline" justify="center"
                      >{{ selectedCard.ref }}
                    </v-card-title>

                    <v-card-text>
                      <p>Visit Date: {{ selectedCard.dateVisit }}</p>
                      <p>Report: {{ selectedCard.cr }}</p>
                      <p>Food: {{ selectedCard.food }}</p>
                      <p>Egg Laying: {{ selectedCard.eggLaying }}</p>
                      <p>
                        Queen Cell Presence:
                        {{ selectedCard.queenCellPresence }}
                      </p>
                      <p>Colony Strength: {{ selectedCard.colonyStrength }}</p>
                      <p>Behavior: {{ selectedCard.behavior }}</p>
                      <p>Brood Size: {{ selectedCard.broodSize }}</p>
                      <p>Number of Varroa: {{ selectedCard.numVarroa }}</p>
                      <p>Comment: {{ selectedCard.comment }}</p>
                      <p>Action Taken: {{ selectedCard.actionTaken }}</p>
                      <p>Planned Action: {{ selectedCard.plannedAction }}</p>
                      <p>Hive Condition: {{ selectedCard.hiveCondition }}</p>
                      <p>Weight: {{ selectedCard.weight }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="!visit_mode">
              <v-card-text>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      label="Food"
                      v-model="visit.food"
                      placeholder="Write Your Report"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visit.eggLaying"
                      label="Egg Laying"
                      hint="Egg Laying"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visit.queenCellPresence"
                      label="Queen Cell Presence"
                      hint="Queen Cell Presence"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visit.colonyStrength"
                      label="Colony Strength"
                      hint="Colony Strength"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="date"
                      v-model="visit.dateVisit"
                      label="Visit Date"
                      hint="DD/MM/YYYY"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visit.hiveCondition"
                      label="Hive Condition"
                      hint="Hive Condition"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visit.weight"
                      label="Weight"
                      hint="Weight"
                      outlined
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visit.behavior"
                      label="Behavior"
                      hint="Behavior"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visit.broodSize"
                      label="Brood Size"
                      hint="Brood Size"
                      outlined
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="number"
                      v-model="visit.numVarroa"
                      label="Number of Varroa"
                      hint="Number of Varroa"
                      outlined
                      :rules="rules.number"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visit.actionTaken"
                      label="Action Taken"
                      hint="Action Taken"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" sm="6">
                    <v-text-field
                      type="text"
                      v-model="visit.plannedAction"
                      label="Planned Action"
                      hint="Planned Action"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="apiary_id"
                      :items="apiaries"
                      label="Apiary"
                      clearable
                      deletable-chips
                      solo
                      required
                      item-value="_id"
                      item-text="ref"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="visit.hives"
                      :items="hives"
                      label="Hives"
                      clearable
                      deletable-chips
                      solo
                      multiple
                      required
                      item-value="_id"
                      item-text="ref"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      type="text"
                      label="Report"
                      v-model="visit.cr"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      type="text"
                      label="Comment"
                      v-model="visit.comment"
                      outlined
                      :rules="rules.string"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="visit_mode = true">
                  Close
                </v-btn>
              </v-card-actions>
            </v-container>

            <v-card v-if="selectedItem != null">
              <!-- <v-card-title class="headline">
                {{ items[selectedItem].text }}
              </v-card-title> -->
            </v-card>
            <v-spacer />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="!visit_mode ? addVisit() : switch_mode()"
          >
            {{ visit_mode ? "Add Visit" : "Save Your Visit" }}
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "users",
  name: "Visits",
  layout: "connected",
  mounted() {
    this.getAllVisits();
    this.getAllApiaries();
  },
  watch: {
    apiary_id(val) {
      if (val) this.getHives();
      else {
        this.hives = [];
        this.hive_id = "";
      }
    },
  },
  data() {
    return {
      selectedCard: null,
      selectedItem: null,
      visit_mode: true,
      apiary_id: "",
      hive_id: "",
      visits: [],
      apiaries: [],
      hives: [],
      visit: {
        dateVisit: null,
        cr: "",
        food: "",
        eggLaying: "",
        queenCellPresence: "",
        colonyStrength: null,
        behavior: "",
        broodSize: null,
        numVarroa: null,
        comment: "",
        actionTaken: "",
        plannedAction: "",
        hiveCondition: "",
        weight: null,
        apiary: null,
        hives: [],
      },
      errorMessage: "",
      rules: {
        string: [(value) => (value || "").trim().length || "Field required!"],
        number: [
          (value) => (value || "").trim().length || "Field required!",
          (value) => value >= 0 || "The number must be positive",
        ],
      },
    };
  },
  methods: {
    showInfo(visit) {
      this.selectedCard = visit;
    },
    closeCard() {
      this.selectedCard = null;
    },
    getAllVisits() {
      this.$get("/visits")
        .then((res) => {
          if (res.data.success) {
            this.visits = res.data.visits;
          } else
            this.$notify({
              label: "Error",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllApiaries() {
      this.$get("/apiaries")
        .then((res) => {
          if (res.data.success) {
            this.apiaries = res.data.apiaries;
          } else
            this.$notify({
              label: "Error",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHives() {
      // Search with the query (where ref like this.apiary_id)
      this.$get(`/hives?apiary_id=${this.apiary_id}`)
        .then((res) => {
          this.hives = res.data.hives;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addVisit() {
      this.visit.apiary = this.apiary_id;
      console.log(this.visit);
      this.$post("/visit", this.visit)
        .then((res) => {
          this.getAllVisits();
          this.visit_mode = !this.visit_mode;
          this.resetInputs();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            label: "Error",
            text: err,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    resetInputs() {
      this.visit = {
        dateVisit: "",
        cr: "",
        food: "",
        eggLaying: "",
        queenCellPresence: "",
        behavior: "",
        broodSize: "",
        numVarroa: "",
        comment: "",
        actionTaken: "",
        plannedAction: "",
        hiveCondition: "",
        weight: "",
        apiary: "",
        hives: [],
      };
    },
    // checkInputs() {
    //   let validForm = true;
    //   this.errorMessage = "";
    //   // check this.visit inputs
    //   console.log(typeof this.visit.dateVisit != "date");
    //   // if(typeof this.visit.dateVisit != "date"){
    //   //  validForm = false
    //   // }
    //   if (
    //     !this.varname.length ||
    //     (this.varname.length && !this.varname.trim().length)
    //   ) {
    //     // string vars
    //     validForm = false;
    //   }

    //   if (!validForm) this.showError();
    // },
    // showError() {
    //   this.errorMessage = "You have entered incorrect values!";
    // },
    switch_mode() {
      this.visit_mode = !this.visit_mode;
    },
  },
};
</script>
