const express = require("express");
const router = express.Router();
const {
  getStockPriceController,
  compareStocksController
} = require("../controllers/stock.controller");

router.get("/price/:symbol", getStockPriceController);
router.post("/compare", compareStocksController);

module.exports = router;
