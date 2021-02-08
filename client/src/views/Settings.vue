<template>
  <v-row justify="center" align="center">
    <v-col align="center" cols="8" lg="5">
      <v-card>
        <v-card-title>Settings</v-card-title>
        <v-card-text>
          <v-text-field
            solo
            :label="user.profile.fullName"
            v-model="euser.name"
          ></v-text-field>
          <v-text-field solo :label="user.profile.email" v-model="euser.email"></v-text-field>
          <v-text-field
            solo
            label="Current Password"
            v-model="euser.cpwd"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      euser: {
        name: null,
        email: null,
        cpwd: null,
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    console.log(this.user.profile.fullName);
  },
};
</script>