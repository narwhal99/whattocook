<template>
  <v-row>
    <v-col>
      <v-col>
        <v-text-field
          label="Search"
          v-model="searchFilter_input"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col>
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
            <v-expansion-panel-content align="center">
              <v-row>
                <v-col>
                  <h3>Ingredients:</h3>
                </v-col>
              </v-row>
              <v-divider />
              <v-list>
                <v-list-item-group>
                  <template v-for="(ingredient, i) in recipe.ingredients">
                    <v-hover v-slot="{ hover }" :key="i">
                      <v-list-item
                        :key="i"
                        :class="hover ? 'gray-hover' : 'none'"
                      >
                        <v-list-item-content>
                          <v-col class="mb-2 pa-0">
                            {{ ingredient.name }}</v-col
                          >
                          <v-list-item-subtitle>
                            {{ ingredient.quantity + " " + ingredient.unit }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-hover>
                  </template>
                </v-list-item-group>
              </v-list>
              <v-row>
                <v-col><h3>Preparation:</h3> </v-col>
              </v-row>
              <v-divider />
              <v-list>
                <v-list-item-group>
                  <template v-for="(prep, i) in recipe.preparation">
                    <v-list-item :key="i">
                      <v-list-item-content style="color: black">
                        <v-col> {{ i + 1 }}. {{ prep }} </v-col>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
              <v-divider />
              <v-col>
                <h3>Description:</h3>
              </v-col>
              <v-row>
                <v-col> {{ recipe.description }} </v-col>
              </v-row>
              <v-btn small outlined :to="'/recipe/' + recipe._id"
                >Open recipe</v-btn
              >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchFilter_input: "",
      selectedIngredients: [],
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

<style scoped>
a {
  text-decoration: none;
}
.even {
  background: #e5e7e9;
}

.gray-hover {
  background: #f0f0f5;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
}
</style>