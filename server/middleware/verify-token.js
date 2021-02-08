const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  let checkBearer = "Bearer ";

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length, token.length);
    }
    jwt.verify(token, process.env.TOKENKEY, async (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "Failed to authenticate",
        });
      } else {
        req.user = await User.findOne({ _id: decoded._id });
        if (!req.user) {
          res.status(401).json({
            success: false,
            message: "Failed to authenticate",
          });
          return;
        }
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
};
