<template>
  <v-app>
    <notifications position="bottom right" class="notification_container" />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <img src="../assets/img/logo.png" alt="" height="100%" class="mr-4" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="notifications = !notifications">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="notifications" :right="right" temporary fixed>
      <v-list>
        <v-list-item :to="'/hives'">
          <v-list-item-action>
            <v-icon color="orange"> mdi-information-outline </v-icon>
          </v-list-item-action>
          <p>
            The weight of hive RU14032275 is increasing. Consider collecting
            soon.
          </p>
        </v-list-item>
        <v-list-item :to="'/visits'">
          <v-list-item-action>
            <v-icon color="green"> mdi-check </v-icon>
          </v-list-item-action>
          <p>Your last visit has been recorded. See details.</p>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item :to="'/profile'">
          <v-list-item-action>
            <v-icon color="black"> mdi-account-outline </v-icon>
          </v-list-item-action>
          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon color="red"> mdi-location-exit </v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "DefaultLayout",
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        conf_password: "",
        NumTel: "",
      },
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-beehive-outline",
          title: "Hive Manager",
          to: "/hives",
        },
        {
          icon: "mdi-walk",
          title: "Visit Manager",
          to: "/visits",
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      notifications: false,
      title: "Green Bee",
    };
  },
  methods: {
    logout() {
      Cookie.set("auth", null);
      this.$store.state.auth = null;
      this.$router.push("/");
    },
  },
};
</script>
