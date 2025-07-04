const User = require("../models/user.model");

const updateUserController = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "User update failed" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "User deletion failed" });
  }
};

module.exports = {
  updateUserController,
  deleteUserController
};
