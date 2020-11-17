<template>
  <v-row justify="center" align="center">
    <v-col cols="5">
      <v-form ref="AddFoodForm" @submit.prevent="addFoodSubmit">
        <v-card dark>
          <v-card-title>
            <v-row justify="center" align="center">Add Food</v-row>
          </v-card-title>
          <v-card-text justify="center" align="center">
            <v-col cols="10">
              <v-text-field
                label="Food name"
                v-model="food.name"
              ></v-text-field>
              <v-text-field
                label="Quantity"
                v-model="food.quantity"
              ></v-text-field>
              <v-select
                label="Unit"
                :items="foodUnit"
                v-model="food.unit"
              ></v-select>
            </v-col>
            <p v-if="errorMsg" class="red--text">{{ errorMsg }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" type="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      food: {
        name: null,
        unit: null,
        quantity: null,
      },
      foodUnit: [
        "db",
        "kg",
        "dkg",
        "g",
        "l",
        "dl",
        "ml",
        "evőkanál",
        "kiskanál",
        "csipet",
      ],
    };
  },
  methods: {
    async addFoodSubmit() {
      try {
        const resp = await this.$store.dispatch("addFood", this.food);
        if (resp.status === 201) {
          this.$refs.AddFoodForm.reset();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapGetters(["errorMsg"]),
  },
};
</script>

<style></style>
