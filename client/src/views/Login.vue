<template>
  <v-row justify="center" align="center">
    <v-col  cols="11" md="5" align="center">
      <v-card dark>
        <v-card-title>
          <v-row justify="center" align="center">
            Bejelentkezés
          </v-row>
        </v-card-title>
        <v-form ref="loginForm" @submit.prevent="loginSubmit">
          <v-card-text>
            <v-text-field solo label="Felhasználónév" v-model="username"></v-text-field>
            <v-text-field
              solo
              label="Jelszó"
              v-model="password"
              type="password"
            ></v-text-field>
            <p v-if="errorMsg" class="red--text">{{ errorMsg }}</p>
            <v-col jusitfy="center" align="center">
              <p>Még nem regisztráltál? Regisztrálj...</p>
              <v-btn to="/registration">Regisztráció</v-btn>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center" align="center">
              <v-btn type="submit">Bejelentkezés</v-btn>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: null,
      password: "",
    };
  },
  methods: {
    async loginSubmit() {
      let user = {
        username: this.username,
        password: this.password,
      };
      try {
        const resp = await this.$store.dispatch("loginSubmit", user);
        if (resp.status === 200) {
          this.$router.go();
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  computed: {
    ...mapGetters(["errorMsg"]),
  },
};
</script>

<style></style>
