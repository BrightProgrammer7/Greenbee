<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Personal Space </v-card-title>
        <v-card-text>
          <p>
            Welcome to Green Bee, your beekeeping farm management platform
          </p>
          <p>
            You can now model your farm with the
            <a :href="'/hives'">hive manager.</a>
          </p>
          <p>
            After that, you can configure measurement automation.
          </p>
          <p>
            You will also have the possibility to keep a record of your
            <a :href="'/visits'">visits.</a>
          </p>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "users",
  layout: "connected",
  name: "Dashboard",
  mounted: function () {},
};
</script>
