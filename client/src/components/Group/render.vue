<template>
  <v-row justify="center" align="center">
    <v-col cols="5" align="center">
      <v-card dark>
        <v-card-title>Group Information</v-card-title>
        <v-card-text>
          <v-col>
            <h2>Members:</h2>
            <v-row justify="center">
              <template v-for="(member, i) in user.group.members">
                <v-hover v-slot:default="{ hover }" :key="i">
                  <v-card
                    dark
                    :elevation="hover ? 16 : 2"
                    id="noselect"
                    class="ma-3 pa-6"
                  >
                    <v-icon>face</v-icon>
                    {{ member.fullName }}
                  </v-card>
                </v-hover>
              </template>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style></style>
