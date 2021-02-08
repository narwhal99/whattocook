const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Group = require("../../models/group");
const Recipe = require("../../models/recipe");

//User withhout group
const userOne = {
  fullName: "Without Group",
  email: "withoutgroup@example.com",
  password: "password321",
};

//Dont have member
const groupOne = {
  _id: new mongoose.Types.ObjectId(),
};

//User with group
const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  fullName: "With Group",
  email: "withgroup@example.com",
  password: "password321",
};

//User group with two
const userThree = {
  _id: new mongoose.Types.ObjectId(),
  fullName: "Group with two",
  email: "groupwithtwo@example.com",
  password: "password321",
};

//Already have member
const groupTwo = {
  _id: new mongoose.Types.ObjectId(),
  members: [userTwo._id, userThree._id],
};

const recipeOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Without owner",
  preparation: ["Moss étel1", "Mosst étel2"],
  description: "főződ",
  owner: userThree._id,
};

const recipeTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: "With owner",
  preparation: ["Moss étel1", "Mosst étel2"],
  description: "főződ",
  owner: userTwo._id,
};


const userOneToken = async () => {
  const user = await User.findOne({ email: userOne.email });
  const token = jwt.sign(user.toJSON(), process.env.TOKENKEY);
  return token;
};
const userTwoToken = async () => {
  const user = await User.findOne({ email: userTwo.email });
  const token = jwt.sign(user.toJSON(), process.env.TOKENKEY);
  return token;
};
const userThreeToken = async () => {
  const user = await User.findOne({ email: userThree.email });
  const token = jwt.sign(user.toJSON(), process.env.TOKENKEY);
  return token;
};
const setupDatabase = async () => {
  await User.deleteMany();
  await Group.deleteMany();
  await Recipe.deleteMany();
  await new User(userOne).save();
  await new Group(groupOne).save();
  await new User(userTwo).save();
  await new Group(groupTwo).save();
  await new User(userThree).save();
  await new Recipe(recipeOne).save();
  await new Recipe(recipeTwo).save();
};

const closeDataBase = async () => {
  await mongoose.connection.close();
};

module.exports = {
  userOne,
  groupOne,
  recipeOne,
  recipeTwo,
  setupDatabase,
  userOneToken,
  userTwoToken,
  closeDataBase,
  userThreeToken,
};
