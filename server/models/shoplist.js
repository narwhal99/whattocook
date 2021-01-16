const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoplistSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shoplist", ShoplistSchema);
