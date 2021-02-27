const router = require("express").Router();
const auth = require("../middleware/verify-token");
const Recipe = require("../models/recipe");
const authGroup = require("../middleware/verify-group");

router.post("/recipe", auth, async (req, res) => {
  try {
    const recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.phrase = req.body.phrase
    recipe.tags = req.body.tags;
    recipe.owner = req.user._id;
    recipe.peopleamount = req.body.peopleamount;

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
    if (recipe == null) {
      res.status(404).json({
        success: false,
        message: "Unable to find recipe"
      })
    } else {
      res.status(200).json({
        success: true,
        recipe
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

router.get("/recipes", auth, async (req, res) => {
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
                phrase: req.body.phrase,
                description: req.body.description,
                tags: req.body.tags,
                peopleamount: req.body.peopleamount
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

router.delete("/recipe/:id", auth, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id, function (err) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      res.status(200).json({
        success: true,
        message: "You successfully removed a recipe!",
      });
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

// const differenceCalculation = (ingredient, fridgeFood) => {};
module.exports = router;
