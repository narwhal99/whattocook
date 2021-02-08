<template>
  <v-row align="center" justify="center" style="backgroundcolor: #ece5d7">
    <v-col align="center" cols="10">
      <v-row>
        <v-col>
          <h2>{{ user.profile.fullName }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" class="pa-0 ma-0">
          <v-hover v-slot="{ hover }">
            <v-btn
              outlined
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
              outlined
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
      <v-row>
          <v-col align="center" class="pa-0 ma-0">
          <v-hover v-slot="{ hover }">
            <v-btn
              outlined
              :elevation="hover ? 16 : 0"
              text
              to="/settings"
              width="100%"
              height="250px"
              >Settings</v-btn
            >
          </v-hover>
        </v-col>
        <v-col align="center" class="pa-0 ma-0" v-if="!haveGroup">
          <v-hover v-slot="{ hover }">
            <v-btn
              outlined
              :elevation="hover ? 16 : 0"
              text
              to="/group/join"
              width="100%"
              height="250px"
              >Join / Create Group</v-btn
            >
          </v-hover>
        </v-col>
        <v-col align="center" class="pa-0 ma-0" v-if="haveGroup">
          <v-hover v-slot="{ hover }">
            <v-btn
              outlined
              :elevation="hover ? 16 : 0"
              text
              to="/group"
              width="100%"
              height="250px"
              >Show my Group</v-btn
            >
          </v-hover>
        </v-col>
        <v-col align="center" class="pa-0 ma-0" v-if="haveGroup">
          <v-hover v-slot="{ hover }">
            <v-btn
              outlined
              :elevation="hover ? 16 : 0"
              text
              to="/shoplist"
              width="100%"
              height="250px"
              >Show my shopping list</v-btn
            >
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user", "haveGroup"]),
  },
};
</script>
<style scoped>
.v-btn {
  border-radius: 0%;
}
</style>
