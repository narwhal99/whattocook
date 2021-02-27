<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="9" xl="6">
        <v-form ref="mainForm" @submit="submit">
          <v-card class="px-4">
            <v-col class="black--text">
              <h1>Recept hozzáadás</h1>
            </v-col>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    solo
                    label="Név"
                    v-model="recipe.name"
                    :rules="[(v) => !!v || 'Kérlek töltsd ki!']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <template v-for="(phrase, i) in recipe.phrase">
                <v-card :key="i" class="mb-5">
                  <v-card-text>
                    <v-col>
                      <v-row v-if="recipe.phrase.length > 1">
                        <v-col>
                          <v-text-field
                            append-outer-icon="mdi-delete"
                            @click:append-outer="remove_recipephrase(i)"
                            solo
                            label="Fázis megnevezés"
                            v-model="phrase.name"
                            :rules="[(v) => !!v || 'Kérlek töltsd ki!']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="black--text">
                          <h1>Hozzávalók:</h1>
                        </v-col>
                      </v-row>
                      <v-row
                        v-for="(data, index) in phrase.ingredients"
                        :key="index"
                      >
                        <v-col cols="12" lg="6">
                          <v-text-field
                            solo
                            label="Alapanyag"
                            v-model="data.name"
                            @change="addNewLineIng(index, i)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" lg="3">
                          <v-text-field
                            solo
                            type="number"
                            label="Mennyiség"
                            v-model="data.quantity"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" lg="3">
                          <v-select
                            v-if="data.unit != 'Egyéb'"
                            append-outer-icon="mdi-delete"
                            @click:append-outer="ingredientMinusIng(index, i)"
                            solo
                            :items="foodUnit"
                            v-model="data.unit"
                            label="Mértékegység"
                          ></v-select>
                          <v-text-field
                            label="Mértékegység"
                            v-else
                            solo
                            append-outer-icon="mdi-delete"
                            @click:append-outer="ingredientMinusIng(index)"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="end">
                        <v-btn text @click="ingredientPlus(i)"
                          >Hozzávaló hozzáadása
                          <v-icon dark right>add_box</v-icon></v-btn
                        >
                      </v-row>

                      <v-col>
                        <v-divider />
                      </v-col>
                      <v-row>
                        <v-col class="black--text">
                          <h1>Lépések:</h1>
                        </v-col>
                      </v-row>
                      <v-row
                        v-for="(data, index) in phrase.preparation"
                        :key="'A' + index"
                      >
                        <v-col>
                          <v-text-field
                            :prefix="index + 1 + '.'"
                            solo
                            label="Leírás"
                            v-model="data.value"
                            :key="index"
                            append-outer-icon="mdi-delete"
                            @click:append-outer="ingredientMinusPrep(index, i)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="end">
                        <v-btn text @click="ingredientPlusPrep(i)"
                          >További lépés hozzáadása
                          <v-icon dark right>add_box</v-icon></v-btn
                        >
                      </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </template>
              <v-row>
                <v-col align="center">
                  <v-btn outlined width="100%" @click="add_recipePhrase">
                    Fázis hozzáadás
                    <v-icon dark right>add_box</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="start">
                <v-col class="black--text">
                  <h1>Leírás:</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    solo
                    label="Leírás"
                    v-model="recipe.description"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row justify="start">
                <v-col class="black--text">
                  <h1>Jellemzők:</h1>
                </v-col>
              </v-row>
              <v-row justify="start">
                <v-col cols="6">
                  <v-combobox
                    v-model="recipe.tags"
                    solo
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
                    v-model="recipe.peopleamount"
                    :items="peopleamount"
                    item-text="text"
                    item-value="value"
                    solo
                    label="Hány főre?"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn outlined type="submit"
                  >Recept mentése <v-icon right>save</v-icon></v-btn
                >
              </v-row>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
    >
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">Bezár</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tagSearch: null,
      snackbarColor: "success",
      snackbarTimeout: 2000,
      snackbarText: "",
      snackbar: false,
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
      recipe: {
        name: null,
        phrase: [
          {
            name: null,
            ingredients: [
              {
                name: null,
                quantity: null,
                unit: null,
              },
            ],
            preparation: [{ value: null }],
          },
        ],
        description: "",
        tags: [],
        peopleamount: null,
      },
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
      this.recipe.phrase.splice(index, 1);
    },
    add_recipePhrase() {
      this.recipe.phrase.push({
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
    async submit(e) {
      e.preventDefault();
      if (this.$refs.mainForm.validate()) {
        try {
          //for (let i = 0; i < this.recipe.ingredients.length; i++) {
          //  if (this.recipe.ingredients[i].name === "") {
          //    this.recipe.ingredients.splice(i, 1);
          //  }
          // }
          const resp = await this.$store.dispatch("addRecipe", this.recipe);
          if (resp.status === 201) {
            this.snackbar = true;
            this.snackbarText = "Sikeressen hozzáadatad a receptet!";
            this.$refs.mainForm.reset();
          } else {
            console.log(resp);
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    ingredientPlusPrep(i) {
      this.recipe.phrase[i].preparation.push({ value: "" });
    },
    ingredientPlus(i) {
      this.recipe.phrase[i].ingredients.push({
        name: "",
        quantity: null,
        unit: "",
      });
    },
    ingredientMinusPrep(index, i) {
      if (this.recipe.phrase[i].preparation.length < 2) {
        return;
      } else {
        this.recipe.phrase[i].preparation.splice(index, 1);
      }
    },
    ingredientMinusIng(index, i) {
      if (this.recipe.phrase[i].ingredients.length < 2) {
        return;
      } else {
        this.recipe.phrase[i].ingredients.splice(index, 1);
      }
    },
    addNewLineIng(index, i) {
      if (index + 1 === this.recipe.phrase[i].ingredients.length) {
        this.ingredientPlus(i);
      }
    },
    // addNewLinePrep(index) {
    //   if (index + 1 === this.recipe.preparation.length) {
    //     this.ingredientPlusPrep();
    //   }
    // },
  },
};
</script>

<style></style>
