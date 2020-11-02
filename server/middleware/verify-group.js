module.exports = async function (req, res, next) {
  try {
    await req.user
      .populate({
        path: "group",
        model: "Group",
      })
      .execPopulate(function (err, user) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else if (!user.group) {
          res.status(403).json({
            success: false,
            message: "You are not in a group!",
          });
        } else {
          req.user.group = user.group;
          next();
        }
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
