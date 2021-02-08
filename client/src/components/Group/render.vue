<template>
  <v-row justify="center" align="center">
    <v-col cols="11" md="5" align="center">
      <v-card dark>
        <v-card-title>
          <v-row justify="center">
            <v-col cols="12"> Group Information </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <h4>Group ID: {{ user.group._id }}</h4>
          </v-row>
          <v-divider></v-divider>
          <v-col>
            <h3>Members:</h3>
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
        <v-card-actions>
          <v-col>
            <v-btn @click="leaveGroup">Kilépés</v-btn>
          </v-col>
        </v-card-actions>
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
