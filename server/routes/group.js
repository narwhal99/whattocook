const router = require("express").Router();
const Group = require("../models/group");
const auth = require("../middleware/verify-token");

router.post("/group", auth, async (req, res) => {
  try {
    await req.user.populate("group").execPopulate(async function (err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      } else if (user.group === null) {
        const group = new Group();
        group.name = req.body.name;
        group.members.push(req.user._id);

        await group.save();

        res.status(201).json({
          success: true,
          group: group,
          message: "Succesfully created your group!",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "You are already in a group!",
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

router.get("/groups", async (req, res) => {
  try {
    const group = await Group.find();

    res.json({
      success: true,
      group: group,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.put("/group/join/:id", auth, async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(403).json({
      success: false,
      message: "Invalid ID!",
    });
  }
  try {
    await req.user
      .populate({
        path: "group",
        model: "Group",
      })
      .execPopulate(async function (err, user) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else if (user.group) {
          res.status(403).json({
            success: false,
            message: "You are already in a group!",
          });
        } else {
          await Group.findOne({ _id: req.params.id }, async function (
            err,
            group
          ) {
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message,
              });
            } else if (group != null) {
              await group.members.push(req.user._id);
              await group.save();
              res.json({
                succes: true,
                message: "Sucessfully joined to a group!",
              });
            } else {
              res.status(403).json({
                success: false,
                message: "Unable to find a group!",
              });
            }
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
