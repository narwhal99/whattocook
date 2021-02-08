<template>
  <v-row justify="center" align="center">
    <v-col align="center" cols="8" lg="5">
      <v-card>
        <h1 class="red">NOW WORKING</h1>
        <v-form
          ref="updatePWform"
          @submit.prevent="updateMyProfile"
          lazy-validation
        >
          <v-card-title> Password change </v-card-title>
          <v-card-text>
            <v-text-field
              type="password"
              label="New password"
              v-model="newPW"
            ></v-text-field>
            <v-text-field
              type="password"
              label="New password again"
              v-model="passwordConfirm"
              :rules="[passwordMatch]"
            ></v-text-field>
            <v-text-field
              type="password"
              label="Current Password"
              v-model="cPW"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" outlined>Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      passwordConfirm: null,
      newPW: null,
      cPW: null,
    };
  },
  computed: {
    passwordMatch() {
      return () =>
        this.newPW === this.passwordConfirm || "Password dont match!";
    },
  },
};
</script>