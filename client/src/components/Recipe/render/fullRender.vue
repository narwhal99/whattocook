<template>
  <v-row justify="center" align="center" v-if="myRecipe">
    <v-col cols="10" lg="6" align="center">
      <v-card flat light color="#E5E8E8">
        <v-card-title>
          <v-row>
            <v-col align="center">
              <h2>
                {{ myRecipe.name }}
              </h2>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider />
        <v-card-text style="color: black">
          <v-row justify="center">
            <v-col cols="12" md="8">
              <v-card color="#CCD1D1">
                <v-col>
                  <h3>Elkészítése</h3>
                </v-col>
                <template v-for="(phrase, i) in myRecipe.phrase">
                  <v-list
                    color="#F2F4F4"
                    align="left"
                    :key="i"
                    v-if="phrase.preparation.length > 0"
                  >
                    <v-subheader v-if="phrase.name">
                      {{ phrase.name }}</v-subheader
                    >
                    <v-list-item-group>
                      <template v-for="(prep, index) in phrase.preparation">
                        <v-list-item :key="index">
                          <v-list-item-content style="color: black">
                            <v-row no-gutters>
                              <v-col> {{ index + 1 }}. {{ prep.value }} </v-col>
                            </v-row>
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
                <v-col>
                  <h3>Hozzávalók</h3>
                </v-col>
                <v-row justify="center">
                  <v-col>
                    <v-icon color="black">add</v-icon>
                  </v-col>
                  <v-col>
                    <strong> {{ myRecipe.peopleamount }}</strong
                    ><br />
                    <p class="subtitle-2">Főre</p>
                  </v-col>
                  <v-col>
                    <v-icon color="black">remove</v-icon>
                  </v-col>
                </v-row>
                <template v-for="(phrase, i) in myRecipe.phrase">
                  <v-list color="#F2F4F4" align="left" :key="i">
                    <v-subheader v-if="phrase.name">{{
                      phrase.name
                    }}</v-subheader>
                    <v-list-item-group multiple v-model="shoplistSelected">
                      <template v-for="(ingredient, i) in phrase.ingredients">
                        <v-list-item :key="i" :value="ingredient">
                          <template v-slot:default="{ active }">
                            <v-list-item-content style="color: black">
                              <v-col class="mb-0 pa-0">
                                {{ ingredient.name }}
                              </v-col>
                              <v-list-item-subtitle>
                                {{
                                  ingredient.quantity + " " + ingredient.unit
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
          <v-col cols="10" v-if="myRecipe.description.length > 0">
            <v-card color="#CCD1D1">
              <v-col>
                <h3>Description:</h3>
              </v-col>
              <v-list color="#F2F4F4" align="left">
                <v-col>
                  {{ myRecipe.description }}
                </v-col>
              </v-list>
            </v-card>
          </v-col>
          <v-divider />
          <v-col>
            <v-row>
              <v-btn
                outlined
                x-small
                @click="editRecipe"
                v-if="user.profile._id == myRecipe.owner"
                >Szerkesztés</v-btn
              >
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
            <v-card>
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
                <v-col cols="12" md="12">
                  <v-row justify="center">
                    <v-col cols="6">
                      <v-text-field
                        label="Recept neve"
                        outlined
                        filled
                        hide-details
                        v-model="editingRecipe.name"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-card class="mt-5">
                    <v-col>
                      <template v-for="(phrase, index) in editingRecipe.phrase">
                        <v-col :key="index + 'one'">
                          <v-row v-if="editingRecipe.phrase.length > 1">
                            <v-col>
                              <h1>{{ index + 1 }}. Fázis</h1>
                            </v-col>

                            <v-btn
                              right
                              absolute
                              text
                              color="error"
                              @click="remove_recipephrase(index)"
                            >
                              Fázis törlése
                            </v-btn>
                          </v-row>
                          <v-row :key="index + 'two'" justify="center">
                            <v-col cols="4">
                              <v-text-field
                                outlined
                                filled
                                label="Fázis név"
                                v-model="phrase.name"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-row :key="index + 'three'">
                          <v-col cols="12" md="6">
                            <v-card class="mb-4">
                              <v-list>
                                <v-col cols="12">
                                  <v-row
                                    justify="center"
                                    align="center"
                                    v-if="phrase.length > 1"
                                  >
                                    <v-col cols="6">
                                      <v-text-field
                                        outlined
                                        filled
                                        label="Fázis név"
                                        v-model="phrase.name"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col>
                                      <h1>Hozzávalók</h1>
                                    </v-col>
                                  </v-row>
                                  <template
                                    v-for="(
                                      ingredient, i
                                    ) in phrase.ingredients"
                                  >
                                    <v-list-item inactive :key="i">
                                      <v-list-item-content style="color: black">
                                        <v-col cols="12" sm="4">
                                          <v-textarea
                                            label="Alapanyag"
                                            filled
                                            outlined
                                            rows="1"
                                            auto-grow
                                            v-model="ingredient.name"
                                          >
                                          </v-textarea>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                          <v-text-field
                                            label="Mennyiség"
                                            filled
                                            v-model="ingredient.quantity"
                                            outlined
                                          >
                                          </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                          <v-select
                                            v-if="ingredient.unit != 'Egyéb'"
                                            append-outer-icon="mdi-delete"
                                            @click:append-outer="
                                              ingredientMinusIng(index, i)
                                            "
                                            outlined
                                            :items="foodUnit"
                                            v-model="ingredient.unit"
                                            label="Mértékegység"
                                            filled
                                          ></v-select>
                                          <v-text-field
                                            label="Mértékegység"
                                            v-else
                                            outlined
                                            append-outer-icon="mdi-delete"
                                            @click:append-outer="
                                              ingredientMinusIng(index, i)
                                            "
                                          >
                                          </v-text-field>
                                        </v-col>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </template>
                                </v-col>
                                <v-col>
                                  <v-row justify="end">
                                    <v-btn text @click="ingredientPlus(index)"
                                      >Hozzávaló hozzáadása
                                      <v-icon dark right>add_box</v-icon></v-btn
                                    >
                                  </v-row>
                                </v-col>
                              </v-list>
                            </v-card>
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-card>
                              <v-col cols="12">
                                <v-row>
                                  <v-col>
                                    <h1>Elkészítése</h1>
                                  </v-col>
                                </v-row>
                                <template
                                  v-for="(prep, i) in phrase.preparation"
                                >
                                  <v-list-item :key="i" inactive>
                                    <v-list-item-content style="color: black">
                                      <v-textarea
                                        filled
                                        outlined
                                        :prefix="i + 1 + '.'"
                                        append-outer-icon="mdi-delete"
                                        @click:append-outer="
                                          ingredientMinusPrep(i, index)
                                        "
                                        rows="1"
                                        auto-grow
                                        v-model="prep.value"
                                      ></v-textarea>
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                              </v-col>
                              <v-col>
                                <v-row justify="end">
                                  <v-btn text @click="ingredientPlusPrep(index)"
                                    >További lépés hozzáadása
                                    <v-icon dark right>add_box</v-icon></v-btn
                                  >
                                </v-row>
                              </v-col>
                            </v-card>
                          </v-col>
                        </v-row>
                      </template>
                      <v-row>
                        <v-col align="center">
                          <v-btn
                            outlined
                            width="100%"
                            @click="add_recipePhrase"
                          >
                            Fázis hozzáadás
                            <v-icon dark right>add_box</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card>
                </v-col>
                <v-divider />
                <v-card class="mt-5">
                  <v-list>
                    <!-- description -->

                    <v-row justify="center">
                      <v-col cols="6">
                        <v-textarea
                          filled
                          outlined
                          rows="2"
                          auto-grow
                          label="Leírás"
                          v-model="editingRecipe.description"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-list>

                  <v-row justify="center">
                    <v-col cols="6">
                      <v-combobox
                        filled
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
                                Nyomj <kbd>enter</kbd>-t hozzáadáshoz: "<strong
                                  >{{ tagSearch }}</strong
                                >"
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="6" md="3">
                      <v-select
                        filled
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
                      >Hozzáadva:
                      {{ formatDate(editingRecipe.addedTime) }}</v-col
                    >
                  </v-row>
                </v-card>
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
      shoplistSelected: [],
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
        "teáskanál",
        "Egyéb",
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
    remove_recipephrase(index) {
      this.editingRecipe.phrase.splice(index, 1);
    },
    add_recipePhrase() {
      this.editingRecipe.phrase.push({
        name: null,
        ingredients: [
          {
            name: null,
            quantity: null,
            unit: null,
          },
        ],
        preparation: [{ value: "" }],
      });
    },
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
    ingredientPlusPrep(index) {
      this.editingRecipe.phrase[index].preparation.push({ value: null });
    },
    ingredientPlus(index) {
      this.editingRecipe.phrase[index].ingredients.push({
        name: null,
        quantity: null,
        unit: null,
      });
    },
    ingredientMinusPrep(index, i) {
      this.editingRecipe.phrase[i].preparation.splice(index, 1);
    },
    ingredientMinusIng(index, i) {
      this.editingRecipe.phrase[index].ingredients.splice(i, 1);
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
    ...mapGetters(["myRecipe", "user"]),
  },
};
</script>
