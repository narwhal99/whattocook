<template>
  <v-row justify="center" style="backgroundColor:#ECE5D7;" >
    <v-col cols="12" lg="3">
      <v-card  dark>
        <v-card-title class="justify-center">
          <h2>Felírás</h2>
        </v-card-title>
        <v-form ref="shoplistForm" @submit="shopItemSubmit">
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  label="Item"
                  v-model="shopItem"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn text outlined type="submit">Add</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" v-if="shoplist">
      <v-data-table
        dark
        :headers="headers"
        :items="shoplist"
       
        hide-default-footer
      >
        <template v-slot:item.createdAt="{ item }"
          >{{ formatDate(item.createdAt) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-col>
    <v-col v-else align="center" cols="6">
      <h1>Your shoplist is empty</h1>
    </v-col>
  </v-row>
</template>

<script>
let moment = require("moment");
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      shopItem: null,
      headers: [
        {
          text: "item",
          value: "item",
        },
        {
          text: "Added at",
          value: "createdAt",
        },
        {
          text: "AddedBy",
          value: "addedBy.fullName",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async deleteItem(item) {
      if (
        confirm("Biztos akarok törölni a hűtőből a(z) " + item.item + "-t?")
      ) {
        const resp = await this.$store.dispatch("shopItemDelete", item._id);
        if (resp.status == 200) {
          await this.$store.dispatch("getShoplist");
        }
      }
    },
    async shopItemSubmit(e) {
      e.preventDefault();
      const resp = await this.$store.dispatch("shopItemSubmit", {
        item: this.shopItem,
      });
      if (resp.status == 201) {
        this.shopItem = null;
        await this.$store.dispatch("getShoplist");
      }
    },
    formatDate(value) {
      return moment(value)
        .locale("hu")
        .format("MMM Do h:m");
    },
  },
  computed: {
    ...mapGetters(["shoplist"]),
  },
  async created() {
    await this.$store.dispatch("getShoplist");
  },
};
</script>

<style></style>
