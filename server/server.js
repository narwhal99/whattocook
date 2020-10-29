const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose.connect(
  "mongodb://127.0.0.1:27017/cook",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database");
    }
  }
);

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require apis
const foodRoutes = require("./routes/food");
const groupRoutes = require("./routes/group");
const userRoutes = require("./routes/user");

app.use("/api", foodRoutes);
app.use("/api", groupRoutes);
app.use("/api", userRoutes);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on PORT", 3000);
  }
});
