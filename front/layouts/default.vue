<template>
  <v-app>
    <notifications position="bottom right" class="notification_container" />
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-spacer />
      <p>Welcome to</p>
      <!-- Translated text -->
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <img src="../assets/img/logo.png" alt="" height="100%" class="mr-4" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      fixed: false,
      title: "Green Bee",
    };
  },
};
</script>
<style lang="css">
/* style to overwrite */
.notification_container {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 12px;
  color: #ffffff;

  &.info {
    background: #44a4fc;
    border-left: 5px solid #187fe7;
  }
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #b2be09 !important;
    border-left-color: #b82e24;
  }
}
</style>
