<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getMyUser");
  },
};
</script>
