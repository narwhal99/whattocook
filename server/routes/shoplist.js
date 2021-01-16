const router = require("express").Router();
const auth = require("../middleware/verify-token");
const Recipe = require("../models/recipe");
const Shoplist = require("../models/shoplist");
const authGroup = require("../middleware/verify-group");

router.post("/shoplist", auth, authGroup, async (req, res) => {
  try {
    const shoplist = new Shoplist({
      ...req.body,
      owner: req.user.group._id,
      addedBy: req.user._id,
    });
    await shoplist.save();
    res.status(201).send({
      success: true,
      message: "Succesfully added to a shoplist",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/shoplist", auth, authGroup, async (req, res) => {
  try {
    await req.user.group
      .populate({
        path: "shoplist",
        populate: {
          path: "addedBy",
        },
      })
      .execPopulate(async function (err, group) {
        if (group.shoplist.length < 1) {
          res.status(404).send({
            success: false,
            message: "Your list is empty",
          });
        } else {
          res.status(201).send({
            success: true,
            list: group.shoplist,
          });
        }
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/shoplist/:id", auth, authGroup, async (req, res) => {
  try {
    await Shoplist.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Successfully removed from a shoplist",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
