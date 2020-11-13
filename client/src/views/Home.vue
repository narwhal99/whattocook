<template>
  <v-row align="center" style="backgroundColor:#ECE5D7;">
    <v-col align="center">
      <v-row>
        <v-col>
          <p>Username</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" class="pa-0 ma-0;">
          <v-hover v-slot="{ hover }">
            <v-btn
              :elevation="hover ? 16 : 0"
              text
              to="/food"
              width="100%"
              height="250px"
              >Food</v-btn
            >
          </v-hover>
        </v-col>
        <v-col align="center" class="pa-0 ma-0">
          <v-hover v-slot="{ hover }">
            <v-btn
              :elevation="hover ? 16 : 0"
              text
              to="/food/add"
              width="100%"
              height="250px"
              >Add Food</v-btn
            >
          </v-hover>
        </v-col>
        <v-col align="center" class="pa-0 ma-0">
          <v-hover v-slot="{ hover }">
            <v-btn
              :elevation="hover ? 16 : 0"
              text
              to="/recipe"
              width="100%"
              height="250px"
              >Recipe</v-btn
            >
          </v-hover>
        </v-col>
        <v-col align="center" class="pa-0 ma-0">
          <v-hover v-slot="{ hover }">
            <v-btn
              :elevation="hover ? 16 : 0"
              text
              to="/recipe/add"
              width="100%"
              height="250px"
              >Add recipe</v-btn
            >
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
.v-btn {
  border: 1px solid black;
  border-right: 0px;
  border-radius: 0%;
}
</style>
