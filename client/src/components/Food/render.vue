<template>
  <v-row justify="center" align="center">
    <v-col cols="8">
      <v-data-table :headers="headers" :items="foods" v-if="foods">
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
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
  computed: {
    ...mapGetters(["foods"]),
  },
};
</script>
