<template>
  <v-app>
    <v-content>
      <Navbar />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/navbar";
export default {
  components: {
    Navbar,
  },
};
</script>
