<template>
  <v-row>
    <v-col>
      <v-text-field
        label="Search"
        v-model="searchFilter_input"
        append-icon="mdi-magnify"
      ></v-text-field>
      <v-expansion-panels>
        <v-expansion-panel v-for="(recipe, i) in searchFilter" :key="i">
          <!-- RECIPE NAME  -->
          <v-expansion-panel-header>
            <v-row>
              <v-col>
                <h3>{{ recipe.name }}</h3>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <h3>Hozzávalók:</h3>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <h3 style="color: red">Hiányzó ételek:</h3>
              </v-col>
            </v-row>
            <v-col>
              <v-row v-for="(ingredient, i) in recipe.ingredients" :key="i">
                <p class="mr-2">
                  <v-icon class="mr-2" small>fiber_manual_record</v-icon
                  >{{ ingredient.quantity }}
                </p>
                <p class="mr-2">{{ ingredient.unit }}</p>
                <a :href="`/alapanyagok/${ingredient.name}`">{{
                  ingredient.name
                }}</a>
              </v-row>
            </v-col>
            <v-row>
              <v-col><h3>Elkészítése:</h3> </v-col>
            </v-row>
            <v-row v-for="(prep, i) in recipe.preparation" :key="i">
              <v-col> {{ i + 1 }}. {{ prep }} </v-col>
            </v-row>
            <v-row>
              <v-col><h3>Leírás:</h3> </v-col>
            </v-row>
            <v-row>
              <v-col> {{ recipe.description }} </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchFilter_input: "",
    };
  },
  computed: {
    ...mapGetters(["myRecipes"]),
    searchFilter() {
      if (!this.myRecipes) return;
      return this.myRecipes.filter((recipes) => {
        return (
          !this.searchFilter_input ||
          recipes.name
            .toLowerCase()
            .indexOf(this.searchFilter_input.toLowerCase()) > -1
        );
      });
    },
  },
};
</script>

<style></style>
