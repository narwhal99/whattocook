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
                        inactive
                        :key="i"
                        :class="hover ? 'gray-hover' : 'none'"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="ingredient.name"
                          ></v-list-item-title>
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
              <v-row
                v-for="(prep, i) in recipe.preparation"
                :key="i"
                :class="{ even: i % 2, odd: !(i % 2) }"
              >
                <v-col> {{ i + 1 }}. {{ prep }} </v-col>
              </v-row>
              <v-row>
                <v-col><h3>Description:</h3> </v-col>
              </v-row>
              <v-divider />
              <v-row>
                <v-col> {{ recipe.description }} </v-col>
              </v-row>
              <v-btn outlined>Open recipe</v-btn>
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