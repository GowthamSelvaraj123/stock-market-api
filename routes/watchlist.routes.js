const express = require("express");
const router = express.Router();
const {
  addToWatchlistController,
  removeFromWatchlistController,
  getWatchlistController
} = require("../controllers/watchlist.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, addToWatchlistController);
router.delete("/remove", authMiddleware, removeFromWatchlistController);
router.get("/", authMiddleware, getWatchlistController);

module.exports = router;
