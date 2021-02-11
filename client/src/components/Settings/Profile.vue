<template>
  <v-row justify="center" align="center">
    <v-col align="center" cols="12" md="5">
      <v-card>
        <v-form
          ref="UpdateProfileFORM"
          @submit.prevent="updateMyProfile"
          lazy-validation
        >
          <v-card-title>Settings</v-card-title>
          <v-card-text>
            <v-text-field label="Name" v-model="euser.fullName"></v-text-field>
            <v-text-field label="Email" v-model="euser.email"></v-text-field>
            <v-text-field
              type="password"
              label="Current Password"
              v-model="euser.cpwd"
            ></v-text-field>
            <p v-if="errorMsg" class="red--text">{{ errorMsg }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" outlined>Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" md="2">
      <v-row justify="center" align="center">
        <v-btn outlined @click="logout">Logout</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      euser: {
        fullName: null,
        email: null,
        password: null,
        cpwd: null,
      },
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.go();
    },
    async updateMyProfile() {
      if (this.$refs.UpdateProfileFORM.validate()) {
        try {
          const resp = await this.$store.dispatch(
            "updateMyProfile",
            this.euser
          );
          if (resp.status == 200) this.$router.go();
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  computed: {
    ...mapGetters(["user", "errorMsg"]),
  },
  created() {
    this.euser = {
      fullName: this.user.profile.fullName,
      email: this.user.profile.email,
    };
  },
};
</script>