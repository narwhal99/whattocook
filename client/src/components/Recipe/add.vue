<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="9" xl="6">
        <v-form ref="mainForm" @submit="submit">
          <v-card raised class="px-4" style="background: #f8c471">
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
              <v-col>
                <v-divider />
              </v-col>
              <v-row>
                <v-col class="black--text">
                  <h1>Hozzávalók:</h1>
                </v-col>
              </v-row>
              <v-row v-for="(data, index) in recipe.ingredients" :key="index">
                <v-col>
                  <v-text-field
                    solo
                    label="Alapanyag"
                    v-model="data.name"
                    @change="addNewLineIng(index)"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    solo
                    type="number"
                    label="Mennyiség"
                    v-model="data.quantity"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    append-outer-icon="mdi-delete"
                    @click:append-outer="ingredientMinusIng(index)"
                    solo
                    :items="foodUnit"
                    v-model="data.unit"
                    label="Mértékegység"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row justify="end">
                <v-btn text @click="ingredientPlus"
                  >Hozzávaló hozzáadása
                  <v-icon dark right>add_box</v-icon></v-btn
                >
              </v-row>
              <v-col>
                <v-divider />
              </v-col>
              <v-col class="black--text">
                <h1>Étel elkészítése:</h1>
              </v-col>
              <v-row
                v-for="(data, index) in this.recipe.preparation"
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
                    @click:append-outer="ingredientMinusPrep(index)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn text @click="ingredientPlusPrep"
                  >További lépés hozzáadása
                  <v-icon dark right>add_box</v-icon></v-btn
                >
              </v-row>
              <v-col>
                <v-divider />
              </v-col>
              <v-col>
                <v-row justify="center">
                  <h3>Leírás:</h3>
                </v-row>
              </v-col>
              <v-row>
                <v-col>
                  <v-textarea
                    solo
                    label="Leírás"
                    v-model="recipe.description"
                    :rules="[(v) => !!v || 'Kérlek töltsd ki!']"
                  ></v-textarea>
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
      ],
      recipe: {
        name: "",
        ingredients: [
          {
            name: "",
            quantity: null,
            unit: "",
          },
        ],
        description: "",
        preparation: [{ value: "" }],
      },
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      if (this.$refs.mainForm.validate()) {
        try {
          for (let i = 0; i < this.recipe.ingredients.length; i++) {
            if (this.recipe.ingredients[i].name === "") {
              this.recipe.ingredients.splice(i, 1);
            }
          }
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
    ingredientPlusPrep() {
      this.recipe.preparation.push({ value: "" });
    },
    ingredientPlus() {
      this.recipe.ingredients.push({
        name: "",
        quantity: 0,
        unit: "",
      });
    },
    ingredientMinusPrep(index) {
      if (this.recipe.preparation.length < 2) {
        return;
      } else {
        this.recipe.preparation.splice(index, 1);
      }
    },
    ingredientMinusIng(index) {
      if (this.recipe.ingredients.length < 2) {
        return;
      } else {
        this.recipe.ingredients.splice(index, 1);
      }
    },
    addNewLineIng(index) {
      if (index + 1 === this.recipe.ingredients.length) {
        this.ingredientPlus();
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
