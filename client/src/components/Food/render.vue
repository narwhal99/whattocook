<template>
  <v-row justify="center" align="center">
    <v-col cols="8" v-if="foods">
      <v-data-table dark :headers="headers" :items="foods">
        <template v-slot:item.createdAt="{ item }">{{
          formatDate(item.createdAt)
        }}</template>
      </v-data-table>
    </v-col>
    <v-col v-else align="center">
      <h1>You dont have any food to display</h1>
    </v-col>
  </v-row>
</template>

<script>
let moment = require("moment");
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "quantity", value: "quantity" },
        { text: "unit", value: "unit" },
        { text: "Added", value: "createdAt" },
      ],
    };
  },
  async created() {
    await this.$store.dispatch("getFoods");
  },
  methods: {
    formatDate(value) {
      return moment(value)
        .locale("hu")
        .format("llll");
    },
  },
  computed: {
    ...mapGetters(["foods"]),
  },
};
</script>
