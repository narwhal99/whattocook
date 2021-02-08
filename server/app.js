const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database");
    }
  }
);

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require apis
const shoplistRoutes = require("./routes/shoplist");
const groupRoutes = require("./routes/group");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");

app.use("/api", shoplistRoutes);
app.use("/api", recipeRoutes);
app.use("/api", groupRoutes);
app.use("/api", userRoutes);

module.exports = app;
