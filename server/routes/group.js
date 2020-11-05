const router = require("express").Router();
const Group = require("../models/group");
const auth = require("../middleware/verify-token");

router.post("/group", auth, async (req, res) => {
  try {
    const group = new Group();
    group.name = req.body.name;
    group.members.push(req.user._id);

    await group.save();

    res.status(201).json({
      success: true,
      message: "Succesfully created your group!",
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
  try {
    await req.user
      .populate({
        path: "group",
        model: "Group",
      })
      .execPopulate();
    if (req.user.group) {
      res.status(403).json({
        success: false,
        message: "You are aleady in a group",
      });
    } else {
      const group = await Group.findOne({ _id: req.params.id });
      if (group) {
        await group.members.push(req.user._id);
        await group.save();

        res.json({
          succes: true,
          message: "Sucessfully joined to a group!",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Group not found!",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
