<template>
  <v-row justify="center" align="center" v-if="myRecipe">
    <v-col cols="8" align="center">
      <v-card flat light>
        <v-card-title>
          <v-row justify="center" align="center">
            <v-col>
              <h2>
                {{ myRecipe.name }}
              </h2>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider />
        <v-card-text style="color: black">
          <v-list>
            <h3>Ingredients</h3>
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
            <v-col> {{ myRecipe.description }} </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["myRecipe"]),
  },
};
</script>
