const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    priceAtTransaction: {
      type: Number,
      required: true
    },
    transactionDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
