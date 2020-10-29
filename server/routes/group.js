const router = require("express").Router();
const Group = require("../models/group");

router.post("/group", async (req, res) => {
  try {
    const group = new Group();
    group.name = req.body.name;

    await group.save();

    res.json({
      success: true,
      message: "Succesfully created a group",
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

router.put("group/join/:id", async (req, res) => {
  try {
    const group = await Group.find({ _id: req.params.id });
    group.members.push()
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
