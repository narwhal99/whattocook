<template>
  <v-row justify="center" align="center">
    <v-col cols="8" v-if="foods">
      <v-data-table dark :headers="headers" :items="foods">
        <template v-slot:item.createdAt="{ item }"
          >{{ formatDate(item.createdAt) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-col>
    <v-col v-else align="center">
      <h1>You dont have any food to display</h1>
    </v-col>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Étel szerkesztése</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-col>
                <v-text-field
                  v-model="editedItem.name"
                  label="Étel név"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  v-model="editedItem.quantity"
                  label="Mennyiség"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="foodUnit"
                  v-model="editedItem.unit"
                  label="Mértékegység"
                ></v-select>
              </v-col>
              <v-col>
                <p>Hozzáadva:</p>
                <p>{{ formatDate(this.editedItem.addedTime) }}</p>
              </v-col>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="close">Mégse</v-btn>
          <v-btn color="success" @click="save">Mentés</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
let moment = require("moment");
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      foodUnit: [
        "db",
        "kg",
        "dkg",
        "g",
        "l",
        "dl",
        "ml",
        "evőkanál",
        "kiskanál",
        "csipet",
      ],
      dialog: false,
      editedIndex: -1,
      editedItem: {},
      headers: [
        { text: "Name", value: "name" },
        { text: "quantity", value: "quantity" },
        { text: "unit", value: "unit" },
        { text: "Added by", value: "owner.fullName" },
        { text: "Added", value: "createdAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async created() {
    await this.$store.dispatch("getFoods");
  },
  methods: {
    formatDate(value) {
      return moment(value)
        .locale("hu")
        .format("llll");
    },
    editItem(item) {
      this.editedIndex = this.foods.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      if (
        confirm("Biztos akarok törölni a hűtőből a(z) " + item.name + "-t?")
      ) {
        const resp = await this.$store.dispatch("deletefood", item._id);
        if (resp.status == 200) {
          this.$store.dispatch("getFoods");
        }
      }
    },
    async save() {
      this.close();
      const food = this.editedItem;
      const resp = await this.$store.dispatch("editFood", food);
      if (resp.status == 200) {
        this.$store.dispatch("getFoods");
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  },
  computed: {
    ...mapGetters(["foods"]),
  },
};
</script>
