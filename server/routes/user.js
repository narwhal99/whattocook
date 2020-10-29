const router = require("express").Router();
const User = require("../models/user");

const jws = require("jsonwebtoken");

router.post("/user/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ sucees: false, message: "Please enter your email or password" });
  } else {
    try {
      const user = new User();
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;

      await user.save();

      let token = jws.sign(user.toJSON(), process.env.TOKENKEY, {
        expiresIn: 604800, // 1 week
      });

      res.json({
        success: true,
        token: token,
        message: "Succesfully created a user",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
});

module.exports = router;
