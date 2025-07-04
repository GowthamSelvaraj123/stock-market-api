const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    symbols: [
      {
        type: String,
        required: true,
        uppercase: true // example: RELIANCE.BSE
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
