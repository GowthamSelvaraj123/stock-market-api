const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    open: Number,
    high: Number,
    low: Number,
    volume: Number,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
