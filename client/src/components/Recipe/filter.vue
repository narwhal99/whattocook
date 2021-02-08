<template>
  <v-col>
    <v-row>
      <v-col>
        <h1>Filter</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-switch
          :disabled="!haveGroup"
          @change="switchChangeCall"
          v-model="recipeGroupSwitch"
          label="Csoport receptek mutatása"
        ></v-switch>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      recipeGroupSwitch: false,
    };
  },
  methods: {
    switchChangeCall() {
      if (this.recipeGroupSwitch) {
        this.$store.dispatch("getMyGroupRecipes");
      } else {
        this.$store.dispatch("getMyRecipes");
      }
    },
  },
  computed: {
    ...mapGetters(["haveGroup"]),
  },
};
</script>

<style></style>
