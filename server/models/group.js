const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
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

GroupSchema.virtual("shoplist", {
  ref: "Shoplist",
  localField: "_id",
  foreignField: "owner",
});

// https://www.google.com/search?sxsrf=ALeKk03RtcY9dykev8pjFfpYJ6K5j5YA9g%3A1605671184580&ei=EJm0X_35IqeGjLsPgYy30A4&q=mongoose+unique+in+group&oq=mongoose+unique+in+group&gs_lcp=CgZwc3ktYWIQAzoECAAQRzoHCCMQsAIQJ1D-EVjsGmDfG2gEcAN4AIABR4gB0gGSAQEzmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwj9wdSkl4vtAhUnA2MBHQHGDeoQ4dUDCA0&uact=5
// https://stackoverflow.com/questions/14283503/unique-documents-using-multiple-values-in-mongoose-schema
module.exports = mongoose.model("Group", GroupSchema);
