const router = require("express").Router();
const Food = require("../models/food");
const auth = require("../middleware/verify-token");

//POST request
router.post("/food", async (req, res) => {
  try {
    const food = new Food();
    food.name = req.body.name;
    food.quantity = req.body.quantity;
    food.unit = req.body.unit;

    await food.save();

    res.json({
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

router.get("/foods", auth, async (req, res) => {
  try {
    let foods = await Food.find({});

    res.json({
      success: true,
      foods: foods,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
