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
            <v-expansion-panel-header color="#CCD1D1">
              <v-row>
                <v-col align="center">
                  <h2>{{ recipe.name }}</h2>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content align="center" color="#E5E8E8">
              <v-row justify="center">
                <v-col cols="12" md="8">
                  <v-card color="#CCD1D1">
                    <v-row>
                      <v-col><h3>Elkészítése</h3> </v-col>
                    </v-row>
                    <template v-for="(phrase, index) in recipe.phrase">
                      <v-list color="#F2F4F4" align="left" :key="index">
                        <v-subheader v-if="phrase.name">{{
                          phrase.name
                        }}</v-subheader>
                        <v-list-item-group>
                          <template v-for="(prep, i) in phrase.preparation">
                            <v-list-item :key="i">
                              <v-list-item-content style="color: black">
                                <v-list-item-title>
                                  {{ i + 1 }}. {{ prep.value }}
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </template>
                  </v-card>
                </v-col>
                <v-col cols="12" md="3">
                  <v-card color="#CCD1D1">
                    <v-row>
                      <v-col>
                        <h3>Hozzávalók</h3>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col>
                        <v-icon large color="black">add</v-icon>
                      </v-col>
                      <v-col>
                        <strong> {{ recipe.peopleamount }}</strong>
                        <br />
                        <p class="subtitle-2">Főre</p>
                      </v-col>
                      <v-col>
                        <v-icon large color="black">remove</v-icon>
                      </v-col>
                    </v-row>
                    <template v-for="(phrase, index) in recipe.phrase">
                      <v-list flat color="#F2F4F4" align="left" :key="index">
                        <v-subheader v-if="phrase.name">{{
                          phrase.name
                        }}</v-subheader>
                        <v-list-item-group multiple v-model="shoplistSelected">
                          <template
                            v-for="(ingredient, i) in phrase.ingredients"
                          >
                            <v-list-item :key="i" :value="ingredient">
                              <template v-slot:default="{ active }">
                                <v-list-item-content>
                                  <v-col class="mb-0 pa-0">
                                    {{ ingredient.name }}</v-col
                                  >
                                  <v-list-item-subtitle>
                                    {{
                                      ingredient.quantity +
                                      " " +
                                      ingredient.unit
                                    }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                  <v-checkbox
                                    :input-value="active"
                                    color="deep-purple accent-4"
                                  ></v-checkbox>
                                </v-list-item-action>
                              </template>
                            </v-list-item>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </template>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="shoplistSelected.length > 0">
                <v-col>
                  <v-btn outlined small @click="submitToShoplist"
                    >Bevásárló listára írása</v-btn
                  >
                </v-col>
              </v-row>
              <v-divider />
              <v-col cols="10">
                <v-card color="#CCD1D1">
                  <v-col>
                    <h3>Description:</h3>
                  </v-col>
                  <v-list color="#F2F4F4" align="left">
                    <v-col>
                      {{ recipe.description }}
                    </v-col>
                  </v-list>
                </v-card>
              </v-col>
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
      shoplistSelected: [],
    };
  },
  methods: {
    async submitToShoplist() {
      this.shoplistSelected.forEach(async (item) => {
        const itemName = item.name + " " + item.quantity + " " + item.unit;
        const resp = await this.$store.dispatch("shopItemSubmit", {
          item: itemName,
        });
        if (resp.status == 201) {
          this.shoplistSelected = [];
        }
      });
    },
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
</style>