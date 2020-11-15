<template>
  <v-row justify="center" align="center">
    <v-col cols="4" align="center">
      <v-card dark>
        <v-card-title>
          <v-row justify="center" align="center">Join to a Group </v-row>
        </v-card-title>
        <v-form ref="joinGroupForm" @submit.prevent="joinSubmit">
          <v-card-text>
            <v-text-field label="Group ID"></v-text-field>
            <h3 class=" pb-3">Or</h3>
            <v-btn @click="createGroupSubmit">Create a group</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    async createGroupSubmit() {
      try {
        const resp = await this.$store.dispatch("createGroup");
        if (resp.status === 201) {
          this.$router.go();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
