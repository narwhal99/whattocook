const router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/verify-token");
const jwt = require("jsonwebtoken");

router.post("/user/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res
      .status(403)
      .json({ sucees: false, message: "Please enter your email or password" });
  } else {
    try {
      const user = new User();
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.password = req.body.password;

      await user.save();

      let token = jwt.sign(user.toJSON(), process.env.TOKENKEY, {
        expiresIn: 604800, // 1 week
      });

      res.status(201).json({
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

router.post("/user/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res
      .status(403)
      .json({ sucees: false, message: "Please enter your email or password" });
  } else {
    try {
      let foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser) {
        res.status(403).json({
          success: false,
          message: "Authentcation failed, User not found.",
        });
      } else {
        if (foundUser.comparePassword(req.body.password)) {
          let token = jwt.sign(foundUser.toJSON(), process.env.TOKENKEY, {
            expiresIn: 604800,
          });
          res.status(201).json({
            success: true,
            token: token,
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Authentication failed, Wong Password!",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
});

router.get("/user/me", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
