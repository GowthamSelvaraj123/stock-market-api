const express = require("express");
const router = express.Router();
const {
  updateUserController,
  deleteUserController
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.put("/update", authMiddleware, updateUserController);
router.delete("/delete", authMiddleware, deleteUserController);

module.exports = router;
