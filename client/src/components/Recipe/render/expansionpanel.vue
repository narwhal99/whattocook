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
                <v-col align="center">
                  <h2>{{ recipe.name }}</h2>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content align="center">
              <v-divider />
              <v-row justify="center">
                <v-col cols="1">
                  <v-icon color="black">add</v-icon>
                </v-col>
                <v-col cols="1">
                  <strong> {{ recipe.peopleamount }}</strong
                  ><br />
                  <p class="subtitle-2">Főre</p>
                </v-col>
                <v-col cols="1">
                  <v-icon color="black">remove</v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h3>Hozzávalók</h3>
                </v-col>
              </v-row>
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
              <v-divider />
              <v-row>
                <v-col><h3>Elkészítése</h3> </v-col>
              </v-row>
              <v-list>
                <v-list-item-group>
                  <template v-for="(prep, i) in recipe.preparation">
                    <v-list-item :key="i">
                      <v-list-item-content style="color: black">
                        <v-col> {{ i + 1 }}. {{ prep.value }} </v-col>
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
                <v-col>
                  {{ recipe.description }}
                </v-col>
              </v-row>
              <v-col>
                <v-row justify="center">
                  <v-btn small outlined :to="'/recipe/' + recipe._id"
                    >Open recipe</v-btn
                  >
                </v-row>
              </v-col>
              <v-row justify="end">
                <template v-for="(tags, i) in recipe.tags">
                  <v-btn outlined x-small :key="i" class="mr-1" color="grey">{{
                    tags
                  }}</v-btn>
                </template>
              </v-row>
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