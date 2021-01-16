const router = require("express").Router();
const Food = require("../models/food");
const auth = require("../middleware/verify-token");
const authGroup = require("../middleware/verify-group");

//POST request
router.post("/food", auth, authGroup, async (req, res) => {
  try {
    const food = new Food();
    food.name = req.body.name;
    food.quantity = req.body.quantity;
    food.unit = req.body.unit;
    food.owner = req.user._id;

    req.user.group.foods.push(food._id);

    await req.user.group.save();
    await food.save();

    res.status(201).json({
      success: true,
      message: "Successfully created a new food",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/foods", auth, authGroup, async (req, res) => {
  try {
    await req.user.group
      .populate({
        path: "foods",
        populate: {
          path: "owner",
          model: "User",
        },
      })
      .execPopulate(async function (err, group) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else if (group.foods.length > 0) {
          res.json({
            success: true,
            foods: group.foods,
          });
        } else {
          res.json({
            success: false,
            message: "You dont have food in group!",
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

router.delete("/food/:id", auth, authGroup, async (req, res) => {
  try {
    await Food.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "Succesfully removed a food",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.patch("/food", auth, authGroup, async (req, res) => {
  try {
    await Food.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
      unit: req.body.unit,
    });
    res.status(200).json({
      success: true,
      message: "Succesfully edited a food",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
