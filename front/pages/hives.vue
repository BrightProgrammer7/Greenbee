<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline"> Hive Manager </v-card-title>
        <v-card-text>
          <p>Add the navigation table here</p>
          <p>Apiaries in the form of Folder/</p>
          <p>Hives in the form of ./File/Queen</p>
          <div v-if="selected_apiary"></div>
        </v-card-text>
        <v-card-actions>
          <v-col cols="4">
            <v-row class="pb-4">
              <v-dialog v-model="dialogApiary" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Add an apiary
                  </v-btn>
                </template>
                <v-card>
                  <apiaryPopup :apiary="apiary" />
                  <v-card-action>
                    <v-btn color="primary" text @click="addApiary()">
                      Save Your Apiary
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialogApiary = false">
                      Close
                    </v-btn>
                  </v-card-action>
                </v-card>
              </v-dialog>
            </v-row>
            <v-row>
              <v-subheader>Apiaries</v-subheader>
            </v-row>
            <v-row>
              <v-treeview
                outlined
                :items="items"
                item-key="name"
                return_object
                dense
              >
                <!-- @update:active="activatedNode"
            @update:open="openedNodes" -->
                <template v-slot:prepend="{ item }">
                  <v-icon
                    class="mx-1"
                    small
                    @click="
                      item.name.includes('EN')
                        ? setSelectedApiary(item)
                        : item.name.includes('RU')
                        ? setSelectedHive(item)
                        : setSelectedFrame(item)
                    "
                    >mdi-eye
                  </v-icon>
                </template>
              </v-treeview>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-card v-if="selected_apiary">
              <v-card-title class="headline" justify="center"
                >{{ selected_apiary.ref }}
              </v-card-title>
              <v-card-text>
                <p>
                  Apiary location: {{ selected_apiary.location }}
                </p>
              </v-card-text>
              <v-dialog v-model="dialogHive" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Add a hive
                  </v-btn>
                </template>
                <v-card>
                  <hivePopup
                    :apiary="selected_apiary._id"
                    :hive="hive"
                    :feedList="feedList"
                  />

                  <v-btn color="primary" text @click="closeHive()">
                    Close
                  </v-btn>
                </v-card>
              </v-dialog>
              <v-btn
                color="primary"
                @click="deleteApiary(selected_apiary._id)"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Delete
              </v-btn>
            </v-card>
            <v-card v-else-if="selected_hive">
              <v-card-title class="headline" justify="center"
                >{{ selected_hive.ref }}
              </v-card-title>
              <v-card-text>
                <p>Hive type: {{ selected_hive.hiveType }}</p>
                <p>Start of service: {{ selected_hive.startService }}</p>
                <p>Super: {{ selected_hive.super }}</p>
                <p>Queen excluder: {{ selected_hive.queenExcluder }}</p>
                <p>Bottom board: {{ selected_hive.bottomBoard }}</p>
                <p>Feeder: {{ selected_hive.feeder }}</p>
              </v-card-text>
              <v-card-action>
                <v-dialog v-model="dialogHive" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Add a frame
                    </v-btn>
                  </template>
                  <v-card>
                    <framePopup :frame="frame" />
                    <v-col cols="6"
                      ><v-btn color="primary" text @click="dialogHive = false">
                        Close
                      </v-btn></v-col
                    >
                    <v-col cols="6"
                      ><v-btn
                        color="primary"
                        text
                        @click="addFrame(selected_hive)"
                      >
                        Save Your Frame
                      </v-btn></v-col
                    >
                  </v-card>
                </v-dialog>
                <v-btn
                  color="primary"
                  @click="deleteHive(selected_hive._id)"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Delete
                </v-btn>
              </v-card-action>
            </v-card>
            <v-card v-else-if="selected_frame">
              <v-card-title class="headline" justify="center"
                >{{ selected_frame.ref }}
              </v-card-title>
              <v-card-text>
                <p>Deposit date: {{ selected_frame.depositDate }}</p>
                <p>Waxed: {{ selected_frame.waxed }}</p>
                <p>Honey: {{ selected_frame.honey }}</p>
                <p>Pollen: {{ selected_frame.pollen }}</p>
                <p>Brood: {{ selected_frame.brood }}</p>
                <p>Frame condition: {{ selected_frame.frameCondition }}</p>
              </v-card-text>
              <v-card-action>
                <v-btn
                  color="primary"
                  @click="deleteFrame(selected_frame._id)"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Delete
                </v-btn>
              </v-card-action>
            </v-card>
            <v-card v-else> </v-card>
          </v-col>

          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const axios = require("axios");
export default {
  middleware: "users",
  name: "Hives",
  layout: "connected",
  watch: {},
  data() {
    return {
      opened_memory: [],
      selected_apiary: null,
      test: [],
      apiaryToShow: null,
      selected_hive: null,
      selected_frame: null,
      dialogHive: false,
      dialogApiary: false,
      apiaries: [],
      items: [],
      feedList: [],
      apiary: {
        location: "",
        hives: [],
      },
      hive: {
        queen: {
          codeGen: "",
          marked: "",
          clipped: "",
          birthDate: null,
        },
        frames: [],
        hiveType: "",
        apiary: "",
        startService: null,
        super: "",
        queenExcluder: "",
        bottomBoard: "",
        feeder: "",
      },
      frame: {
        depositDate: null,
        waxed: "",
        honey: "",
        pollen: "",
        brood: "",
        frameCondition: "",
      },
    };
  },
  mounted() {
    this.init();
    this.getAllApiaries();
  },
  methods: {
    closeHive() {
      this.dialogHive = false;
      this.getAllApiaries();
      this.resetInputs();
    },
    setSelectedApiary(item) {
      this.selected_hive = null;
      this.selected_frame = null;
      this.selected_apiary = Object.assign(
        {},
        this.apiaries.filter((x) => x.ref == item.name)[0]
      );
    },
    setSelectedHive(item) {
      this.selected_frame = null;
      this.selected_apiary = null;
      for (const apiary of this.apiaries)
        if (apiary.hives.map((x) => x.ref).includes(item.name))
          this.selected_hive = apiary.hives.filter(
            (x) => x.ref == item.name
          )[0];
    },
    setSelectedFrame(item) {
      this.selected_hive = null;
      this.selected_apiary = null;

      for (const apiary of this.apiaries)
        for (const hive of apiary.hives) {
          if (hive.frames.map((x) => x.ref).includes(item.name))
            this.selected_frame = hive.frames.filter(
              (x) => x.ref == item.name
            )[0];
        }
    },
    deleteApiary(id) {
      this.$del(`/apiary/${id}`)
        .then((res) => {
          this.selected_apiary = null;
          this.getAllApiaries();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          this.$notify({
            label: "Error",
            text: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    deleteHive(id) {
      this.$del(`/hive/${id}`)
        .then((res) => {
          this.selected_hive = null;
          this.getAllApiaries();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          this.$notify({
            label: "Error",
            text: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    deleteFrame(id) {
      this.$del(`/frame/${id}`)
        .then((res) => {
          this.selected_frame = null;
          this.getAllApiaries();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          this.$notify({
            label: "Error",
            text: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    addFrame(hive) {
      this.$post(`/frame`, this.frame)
        .then((res) => {
          console.log(res.data);
          hive.frames.push(res.data.frame._id);
          this.$patch(`/hive/${hive._id}`, hive).then((res) => {
            this.$notify({
              label: "Success",
              text: res.data.message,
              type: "success",
              showAnimation: "slideDown",
            });
          });
          this.resetInputs();
          this.getAllApiaries();
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            label: "Error",
            message: err.message,
            type: "error",
            showAnimation: "slideDown",
          });
        });
    },
    // activatedNode(nodes) {
    //   console.log(nodes);
    // },
    // openedNodes(nodes) {
    //   for (const node of nodes)
    //     if (!this.opened_memory.includes(node)) console.log(node);
    //   for (const opened of this.opened_memory)
    //     if (!nodes.includes(opened)) console.log(opened);
    //   this.opened_memory = nodes;
    // },
    getSelectedApiary() {
      this.apiaryToShow = Object.assign(
        {},
        this.apiaries.filter((x) => x.ref == this.selectedApiary[0].name)[0]
      );
    },
    getAllApiaries() {
      this.$get("/apiaries")
        .then((res) => {
          if (res.data.success) {
            this.apiaries = res.data.apiaries;
            this.items = [];
            for (const apiary of res.data.apiaries) {
              let temp_hives = [];
              for (const hive of apiary.hives) {
                let temp_frames = [];
                for (const frame of hive.frames) {
                  temp_frames.push({
                    name: frame.ref,
                    id: frame._id,
                    children: [],
                  });
                }
                temp_hives.push({
                  name: hive.ref,
                  id: hive._id,
                  children: temp_frames,
                });
              }
              this.items.push({
                name: apiary.ref,
                id: apiary._id,
                children: temp_hives,
              });
            }
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
    addApiary() {
      this.$post("/apiary", this.apiary)
        .then((res) => { 
          this.getAllApiaries();
          this.resetInputs();
          this.$notify({
            text: res.data.message,
            type: "success",
            showAnimation: "slideDown",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addHive() {
      this.$post("/hive", this.hive).then((res) => {
        this.getAllApiaries();
        this.resetInputs();
        this.$notify({
          text: res.data.message,
          type: "success",
          showAnimation: "slideDown",
        });
      });
    },
    resetInputs() {
      this.hive = {
        queen: {
          codeGen: "",
          marked: "",
          clipped: "",
          birthDate: null,
        },
        frames: [
          {
            depositDate: null,
            waxed: "",
            honey: "",
            pollen: "",
            brood: "",
            frameCondition: "",
          },
        ],
        hiveType: "",
        apiary: "",
        startService: null,
        super: "",
        queenExcluder: "",
        bottomBoard: "",
        feeder: "",
      };
      this.frame = {
        depositDate: null,
        waxed: "",
        honey: "",
        pollen: "",
        brood: "",
        frameCondition: "",
      };
      this.apiary = {
        location: "",
        //hive: [],
      };
      this.dialogApiary = false;
      this.dialogHive = false;
    },
    async init() {
      this.$post("/filterNames", await this.getFeeds())
        .then((res) => {
          if (res.data.success) this.feedList = res.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFeeds() {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds?x-aio-key=${process.env.ADAFRUIT_IO_KEY}`
          )
          .then((res) => {
            return resolve(res.data.map((x) => x.key));
          })
          .catch((err) => {
            return reject(err);
          });
      });
    },
  },
};
</script>
