<template>
  <v-row justify="center" align="center">
    <v-col cols="11" md="3" align="center">
      <v-card dark>
        <v-card-title>
          <v-row justify="center" align="center"> Regisztráció </v-row>
        </v-card-title>
        <v-form ref="regForm" @submit.prevent="regSubmit">
          <v-card-text>
            <v-text-field
              solo
              label="Teljes név"
              v-model="fullName"
            ></v-text-field>
            <v-text-field solo label="Felhasználónév" v-model="username"></v-text-field>
            <v-text-field
              solo
              label="Jelszó"
              v-model="password"
              type="password"
            ></v-text-field>
            <p v-if="errorMsg" class="red--text">{{ errorMsg }}</p>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center" align="center">
              <v-btn type="submit">Regisztráció</v-btn>
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
      fullName: null,
      username: null,
      password: null,
    };
  },
  methods: {
    async regSubmit() {
      let user = {
        fullName: this.fullName,
        username: this.username,
        password: this.password,
      };
      try {
        const resp = await this.$store.dispatch("regSubmit", user);
        if (resp.status === 201) {
          this.$router.go();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapGetters(["errorMsg"]),
  },
};
</script>
