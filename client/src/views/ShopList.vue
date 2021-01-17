<template>
  <v-row justify="center" style="backgroundColor:#ECE5D7;">
    <v-col cols="12" lg="3">
      <v-card dark>
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
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>ShopList</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <v-list-item-group
            active-class="black--text"
            multiple
            v-model="selected"
          >
            <template v-for="(item, index) in shoplist">
              <v-list-item :key="index">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.item"> </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon v-if="!active" color="grey lighten-1">
                      check_box_outline_blank
                    </v-icon>
                    <v-icon v-else color="yellow darken-3">
                      check_box
                    </v-icon>
                    <v-list-item-action-text
                      class="text--primary"
                      v-text="item.addedBy.fullName"
                    >
                    </v-list-item-action-text>
                    <v-list-item-action-text
                      v-text="formatDate(item.createdAt)"
                    ></v-list-item-action-text>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
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
      selected: null,

      shopItem: null,
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
