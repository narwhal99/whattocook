<template>
  <v-row>
    <v-col cols="12" sm="3" md="2" justify="center" align="center">
      <FilterApp />
    </v-col>
    <v-col cols="12" sm="9" md="8">
      <appExpansionPanel></appExpansionPanel>
    </v-col>
  </v-row>
</template>

<script>
import appExpansionPanel from "./render/expansionpanel";
import FilterApp from "./filter";

export default {
  components: {
    appExpansionPanel,
    FilterApp,
  },
};
</script>

<style></style>
