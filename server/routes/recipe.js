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
        // user.recipe.map(async (recipe) => {
        //   recipe.ingredients.map(async (ingredient) => {
        //     await req.user.group
        //       .populate({
        //         path: "foods",
        //         match: {
        //           name: ingredient.name,
        //         },
        //       })
        //       .execPopulate(function (err, food) {
        //         console.log(food.foods);
        //       });
        //   });
        // });
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
              { name: req.body.name }
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
