const router = require("express").Router();
const auth = require("../middleware/verify-token");
const Recipe = require("../models/recipe");
const authGroup = require("../middleware/verify-group");

router.post("/recipe", auth, authGroup, async (req, res) => {
  try {
    const recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.preparation = req.body.preparation;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients;
    recipe.owner = req.user._id;

    await recipe.save();

    res.status(201).json({
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

router.get('/recipe/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Unable to find recipe"
      })
    }
    res.status(200).json({
      success: true,
      recipe
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

router.get("/recipes", auth, authGroup, async (req, res) => {
  try {
    await req.user.populate("recipe").execPopulate(async function (err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      } else if (user.recipe.length > 0) {
        res.json({
          success: true,
          recipes: user.recipe,
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

router.put("/recipe/:id", auth, async (req, res) => {
  console.log(req.body)
  try {
    await Recipe.findOne({ _id: req.params.id })
      .populate("owner")
      .exec(async function (err, recipe) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          if (
            recipe != null &&
            recipe.owner._id.toString() == req.user._id.toString()
          ) {
            await Recipe.updateOne(
              { _id: req.params.id },
              {
                name: req.body.name,
                preparation: req.body.preparation,
                ingredients: req.body.ingredients,
                description: req.body.description
              }
            );
            res.json({
              success: true,
              message: "Succesfully edit a recipe!",
            });
          } else {
            res.status(403).json({
              success: false,
              message: "You dont have premission to edit this recipe!",
            });
          }
        }
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// const differenceCalculation = (ingredient, fridgeFood) => {};
module.exports = router;
