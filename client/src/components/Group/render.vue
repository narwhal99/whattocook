<template>
  <v-row justify="center" align="center">
    <v-col cols="11" md="5" align="center">
      <v-card dark>
        <v-card-title>
          <v-row justify="end">
            <v-col cols="6">
              Group Information
            </v-col>
            <v-col cols="3">
              <v-btn @click="leaveGroup">Kilépés</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <h2>Group ID: {{ user.group._id }}</h2>
          </v-row>
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
  methods: {
    async leaveGroup() {
      const resp = await this.$store.dispatch("leaveGroup");
      if (resp.status === 200) {
        this.$router.go();
      } else {
        console.log(resp);
      }
    },
  },
};
</script>

<style></style>
