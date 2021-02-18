<template>
  <v-row justify="center" align="center" v-if="myRecipe">
    <v-col cols="10" align="center">
      <v-card flat light>
        <v-card-title>
          <v-col>
            <h2>
              {{ myRecipe.name }}
            </h2>
          </v-col>
        </v-card-title>
        <v-divider />
        <v-card-text style="color: black">
          <v-row justify="center">
                <v-col cols="1">
                  <v-icon color="black">add</v-icon>
                </v-col>
                <v-col cols="1">
                  <strong> {{ myRecipe.peopleamount }}</strong
                  ><br />
                  <p class="subtitle-2">Főre</p>
                </v-col>
                <v-col cols="1">
                  <v-icon color="black">remove</v-icon>
                </v-col>
              </v-row>
          <v-list>
            <v-col>
              <h3>Ingredients</h3>
            </v-col>
            <v-list-item-group>
              <template v-for="(ingredient, i) in myRecipe.ingredients">
                <v-list-item :key="i">
                  <v-list-item-content style="color: black">
                    <v-col class="mb-2 pa-0">
                      {{ ingredient.name }}
                    </v-col>
                    <v-list-item-subtitle>
                      {{ ingredient.quantity + " " + ingredient.unit }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
          <v-divider />
          <v-row>
            <v-col><h3>Preparation:</h3> </v-col>
          </v-row>
          <v-list>
            <v-list-item-group>
              <template v-for="(prep, i) in myRecipe.preparation">
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
            <v-col> {{ myRecipe.description }} </v-col>
          </v-row>
          <v-divider />
          <v-col>
            <v-row>
              <v-btn outlined x-small @click="editRecipe"> Edit</v-btn>
              <v-spacer />
              <template v-for="(tags, i) in myRecipe.tags">
                <v-btn outlined x-small :key="i" class="mr-1" color="grey">{{
                  tags
                }}</v-btn>
              </template>
            </v-row>
          </v-col>
          <v-dialog
            fullscreen
            hide-overlay
            scrollable
            v-model="editDialog"
            transition="dialog-bottom-transition"
          >
            <v-card dark>
              <v-toolbar flat dark color="#676599" class="shrink">
                <v-btn icon dark @click="exitEditDialog">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Étel szerkesztése</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn text @click="save">Save</v-btn>
                </v-toolbar-items>
                <v-menu bottom right offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-btn text style="color: red" @click="removeRecipe"
                        >Recept törlése</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
              <v-card-text align="center" justify="center">
                <v-row justify="center">
                  <v-col cols="6">
                    <v-col>
                      <h2>Recipe name:</h2>
                    </v-col>
                    <v-text-field
                      filled
                      hide-details
                      v-model="editingRecipe.name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider />
                <v-col>
                  <h2>Ingredients</h2>
                </v-col>
                <v-list>
                  <v-col cols="12" md="7">
                    <v-list-item-group>
                      <template
                        v-for="(ingredient, i) in editingRecipe.ingredients"
                      >
                        <v-list-item :key="i" inactive>
                          <v-list-item-content style="color: black">
                            <v-col cols="6">
                              <v-textarea
                                rows="1"
                                auto-grow
                                v-model="ingredient.name"
                              >
                              </v-textarea>
                            </v-col>
                            <v-col cols="3">
                              <v-text-field v-model="ingredient.quantity">
                              </v-text-field>
                            </v-col>
                            <v-col cols="3">
                              <v-select
                                append-outer-icon="mdi-delete"
                                @click:append-outer="ingredientMinusIng(i)"
                                v-model="ingredient.unit"
                                :items="foodUnit"
                              >
                              </v-select>
                            </v-col>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-col>
                  <v-row justify="end">
                    <v-btn text @click="ingredientPlus"
                      >Hozzávaló hozzáadása
                      <v-icon dark right>add_box</v-icon></v-btn
                    >
                  </v-row>
                </v-list>
                <v-divider></v-divider>
                <v-col>
                  <h2>Preparation</h2>
                </v-col>
                <v-list>
                  <v-col cols="12" md="6">
                    <v-list-item-group>
                      <template v-for="(prep, i) in editingRecipe.preparation">
                        <v-list-item :key="i" inactive>
                          <v-list-item-content style="color: black">
                            <v-textarea
                              :prefix="i + 1 + '.'"
                              append-outer-icon="mdi-delete"
                              @click:append-outer="ingredientMinusPrep(i)"
                              rows="1"
                              auto-grow
                              v-model="prep.value"
                            ></v-textarea>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-col>
                  <v-row justify="end">
                    <v-btn text @click="ingredientPlusPrep"
                      >További lépés hozzáadása
                      <v-icon dark right>add_box</v-icon></v-btn
                    >
                  </v-row>
                </v-list>
                <v-divider />
                <v-list>
                  <!-- description -->
                  <v-row>
                    <v-col>
                      <v-textarea
                        rows="2"
                        auto-grow
                        label="Leírás"
                        v-model="editingRecipe.description"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-list>
                <v-row justify="center">
                  <v-col>
                    <h2>Jellemzők:</h2>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="6">
                    <v-combobox
                      v-model="editingRecipe.tags"
                      outlined
                      :search-input.sync="tagSearch"
                      hide-selected
                      label="Válassz ki jellemzőket a recepthez"
                      multiple
                      persistent-hint
                      small-chips
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Nyomj <kbd>enter</kbd>-t hozzáadáshoz: "<strong>{{
                                tagSearch
                              }}</strong
                              >"
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="6" md="3">
                    <v-select
                      v-model="editingRecipe.peopleamount"
                      :items="peopleamount"
                      item-text="text"
                      item-value="value"
                      outlined
                      label="Hány főre?"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="grey--text darken-3"
                    >Hozzáadva: {{ formatDate(editingRecipe.addedTime) }}</v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
let moment = require("moment");

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tagSearch: null,
      editDialog: false,
      editingRecipe: {},
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
      peopleamount: [
        {
          text: "Adag",
          value: 0,
        },
        {
          text: "1 Főre",
          value: 1,
        },
        {
          text: "2 Főre",
          value: 2,
        },
        {
          text: "3 Főre",
          value: 3,
        },
        {
          text: "4 Főre",
          value: 4,
        },
        {
          text: "5 Főre",
          value: 5,
        },
        {
          text: "6 Főre",
          value: 6,
        },
        {
          text: "7 Főre",
          value: 7,
        },
        {
          text: "8 Főre",
          value: 8,
        },
        {
          text: "9 Főre",
          value: 9,
        },
        {
          text: "10 Főre",
          value: 10,
        },
      ],
    };
  },
  methods: {
    async removeRecipe() {
      if (confirm("Biztosan törölni szeretéd a receptet?")) {
        const resp = await this.$store.dispatch(
          "removeRecipe",
          this.editingRecipe._id
        );
        if (resp.status === 200) {
          this.$router.push("/recipe");
        }
      }
    },
    async save() {
      const resp = await this.$store.dispatch("saveRecipe", this.editingRecipe);
      if (resp.status === 200) {
        this.$router.go();
      }
    },
    ingredientPlusPrep() {
      this.editingRecipe.preparation.push({ value: "" });
    },
    ingredientPlus() {
      this.editingRecipe.ingredients.push({
        name: "",
        quantity: 0,
        unit: "",
      });
    },
    ingredientMinusPrep(index) {
      if (this.editingRecipe.preparation.length < 2) {
        return;
      } else {
        this.editingRecipe.preparation.splice(index, 1);
      }
    },
    ingredientMinusIng(index) {
      if (this.editingRecipe.ingredients.length < 2) {
        return;
      } else {
        this.editingRecipe.ingredients.splice(index, 1);
      }
    },
    exitEditDialog() {
      this.editDialog = false;
      this.editingRecipe = {};
    },
    editRecipe() {
      this.editDialog = true;
      this.editingRecipe = JSON.parse(JSON.stringify(this.myRecipe));
    },
    formatDate(value) {
      return moment(value).locale("hu").format("MMM Do h:m");
    },
  },
  computed: {
    ...mapGetters(["myRecipe"]),
  },
};
</script>
