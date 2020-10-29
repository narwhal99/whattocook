const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
