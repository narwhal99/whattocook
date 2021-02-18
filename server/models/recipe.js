const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        trim: true,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
  ],
  peopleamount: {
    type: Number
  },
  preparation: [
    {
      value: {
        type: String,
      }
    },
  ],
  description: {
    type: String,
  },
  tags: [{
    type: String
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
