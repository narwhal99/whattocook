<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="9" xl="6">
        <v-form ref="mainForm" @submit="submit">
          <v-card raised class="px-4" style="backgroundColor: #d1bb9b ;">
            <v-card-title>
              <v-row justify="center">
                <h2>Recept hozzáadás</h2>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    solo
                    label="Recept neve"
                    v-model="recipe.name"
                    :rules="[(v) => !!v || 'Kérlek töltsd ki!']"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <h1>Hozzávalók:</h1>
              </v-row>
              <v-row v-for="(data, index) in recipe.ingredients" :key="index">
                <v-col>
                  <v-text-field
                    solo
                    label="Hozzá való"
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
                <v-col cols="4">
                  <v-select
                    solo
                    :items="foodUnit"
                    v-model="data.unit"
                    label="Mennyiség"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-icon @click="ingredientMinusIng(index)">mdi-delete</v-icon>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn color="#e9dd45" @click="ingredientPlus"
                  >Sor hozzáadás</v-btn
                >
              </v-row>
              <v-col>
                <v-row justify="center">
                  <h1>Étel elkészítése:</h1>
                </v-row>
              </v-col>
              <v-row
                v-for="(data, index) in this.recipe.preparation"
                :key="'A' + index"
              >
                <v-col>
                  <v-row>
                    <v-col cols="1">
                      <h3>{{ index + 1 }}.</h3>
                    </v-col>
                    <v-text-field
                      solo
                      label="Elkészítés"
                      v-model="data.value"
                      :key="index"
                    ></v-text-field>
                  </v-row>
                </v-col>
                <v-col cols="1">
                  <v-icon @click="ingredientMinusPrep(index)"
                    >mdi-delete</v-icon
                  >
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn color="#e9dd45" @click="ingredientPlusPrep"
                  >Sor hozzáadás</v-btn
                >
              </v-row>
              <v-col>
                <v-row justify="center">
                  <h1>Leírás:</h1>
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
              <v-btn color="#ba3939" type="submit">Hozzáadás</v-btn>
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
            quantity: 0,
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
          const resp = await this.$store.dispatch(
            "addRecipe",
            (this.recipe = {
              ...this.recipe,
              preparation: this.recipe.preparation.map((data) => data.value),
            })
          );
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
