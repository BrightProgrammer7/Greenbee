<template>
  <v-container>
    <v-row align="start" class="mt-4">
      <v-col cols="6">
        <v-card flat class="mt-1 pa-2">
          <v-card-title tag="h1" style="word-break: break-word">
            Connected Hive - Beekeeping Farm Management Platform
          </v-card-title>
          <v-card-text>
            Our goal: to facilitate the automation of monitoring the state of
            your hives.
          </v-card-text>
          <v-card-text>
            Connect or sign up to access your personal space.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-2">
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    depressed
                    block
                    color="secondary"
                    :outlined="register_mode"
                    @click="register_mode ? switch_mode() : null"
                  >
                    Login
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    depressed
                    block
                    color="secondary"
                    :outlined="!register_mode"
                    @click="!register_mode ? switch_mode() : null"
                  >
                    Sign Up
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
          <v-card-actions>
            <v-container>
              <v-row class="text-xs-right">
                <v-spacer />
                <v-col cols="8" class="text-md-center">
                  <em>
                    <small color="info">
                      {{
                        register_mode
                          ? "Enter the required information and submit to continue."
                          : "Enter your email address and password to continue."
                      }}
                    </small>
                  </em>
                </v-col>
                <v-spacer />
              </v-row>
              <v-row class="creds">
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="text"
                        v-model="user.firstname"
                        label="First Name"
                        placeholder="White"
                        outlined
                        :rules="rules.string"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="text"
                        v-model="user.lastname"
                        label="Last Name"
                        placeholder="Walter"
                        outlined
                        :rules="rules.string"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col :cols="register_mode ? 6 : 12">
                      <v-text-field
                        type="email"
                        v-model="user.email"
                        label="Email Address"
                        placeholder="example@gmail.com"
                        outlined
                        :rules="rules.string"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="tel"
                        v-model="user.numTel"
                        label="Phone Number"
                        placeholder="0XXXXXXXXX"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col :cols="register_mode ? 6 : 12">
                      <v-text-field
                        type="password"
                        v-model="user.password"
                        label="Password"
                        placeholder="********"
                        outlined
                        :rules="rules.string"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-if="register_mode"
                        type="password"
                        v-model="user.conf_password"
                        label="Confirm Password"
                        placeholder="********"
                        outlined
                        :rules="rules.string"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-row>
              <v-row>
                <v-spacer />
                <v-col cols="6">
                  <v-btn
                    block
                    color="primary"
                    @click="register_mode ? register() : login()"
                  >
                    {{ register_mode ? "Sign Up" : "Login" }}
                  </v-btn>
                </v-col>
                <v-spacer />
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "IndexPage",
  data: function () {
    return {
      register_mode: false,
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        conf_password: "",
        numTel: "",
      },
      rules: {
        string: [
          (value) => (value || "").trim().length || "Field is required!",
        ],
        number: [
          (value) => (value || "").trim().length || "Field is required!",
          (value) => value >= 0 || "The number must be positive",
        ],
      },
    };
  },
  mounted: function () {
    if (this.$store.state && this.$store.state.auth) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    switch_mode() {
      this.register_mode = !this.register_mode;
    },
    register() {
      if (this.user.password == this.user.conf_password) {
        this.$post("/user", this.user)
          .then((res) => {
            if (res.data.success) {
              this.login();
            } else {
              this.$notify({
                title: "Error occurred",
                text: res.data.message,
                type: "error",
                showAnimation: "slideDown",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$notify({
          title: "Error occurred",
          text: "Password confirmation error",
          type: "error",
          showAnimation: "slideDown",
        });
      }
    },
    login() {
      this.$post("/login", this.user)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit("setAuth", res.data);
            Cookie.set("auth", res.data);
            if (process.browser) {
              localStorage.setItem(
                "last_login_address_used_successfully",
                res.data.user.email.toLowerCase()
              );
            }
            this.$router.push("/dashboard");
          } else {
            this.$notify({
              title: "Error occurred",
              text: res.data.message,
              type: "error",
              showAnimation: "slideDown",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="css" scoped></style>
