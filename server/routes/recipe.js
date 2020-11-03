const router = require("express").Router();
const auth = require("../middleware/verify-token");
const Recipe = require("../models/recipe");

router.post("/recipe", auth, async (req, res) => {
  console.log(req.body);
  try {
    const recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.preparation = req.body.preparation;
    recipe.description = req.body.description;
    recipe.owner = req.user._id;

    await recipe.save();

    res.json({
      success: true,
      message: "Succesfully created your recipe!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/recipe", auth, async (req, res) => {
  try {
    await req.user.populate("recipe").execPopulate(function (err, group) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      } else if (group.recipe.length > 0) {
        res.json({
          success: true,
          recipes: group.recipe,
        });
      } else {
        res.json({
          success: false,
          message: "You dont have any recipe!",
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

module.exports = router;
