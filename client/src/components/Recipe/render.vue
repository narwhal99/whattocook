<template>
  <v-row>
    <v-col cols="12" sm="3" md="2">
      <h1>Filter</h1>
    </v-col>
    <v-col cols="12" sm="9" md="10">
      <appExpansionPanel></appExpansionPanel>
    </v-col>
  </v-row>
</template>

<script>
import appExpansionPanel from "./render/expansionpanel";

export default {
  components: {
    appExpansionPanel,
  },
  created() {
    this.$store.dispatch("getMyRecipes");
  },
};
</script>

<style></style>
