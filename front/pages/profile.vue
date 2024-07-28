<template>
  <v-row>
    <v-col class="text-center">
      <img src="logo.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, find the problem. Then, bee green.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "users",
  name: "Profile",
  layout: "connected",
};
</script>
