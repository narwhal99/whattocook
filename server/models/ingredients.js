const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  about: {
    type: String,
  },
  whentobuy: {
    type: String,
  },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
