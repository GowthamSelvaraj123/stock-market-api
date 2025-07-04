    const Watchlist = require("../models/watchlist.model");

const addToWatchlistController = async (req, res) => {
  const { symbol } = req.body;
  try {
    let list = await Watchlist.findOne({ user: req.user.id });
    if (!list) {
      list = await Watchlist.create({ user: req.user.id, symbols: [symbol] });
    } else if (!list.symbols.includes(symbol)) {
      list.symbols.push(symbol);
      await list.save();
    }
    res.json({ message: "Added", symbols: list.symbols });
  } catch (err) {
    res.status(500).json({ error: "Add failed" });
  }
};

const removeFromWatchlistController = async (req, res) => {
  const { symbol } = req.body;
  try {
    const list = await Watchlist.findOne({ user: req.user.id });
    if (!list) return res.status(404).json({ message: "No watchlist" });

    list.symbols = list.symbols.filter((s) => s !== symbol);
    await list.save();
    res.json({ message: "Removed", symbols: list.symbols });
  } catch (err) {
    res.status(500).json({ error: "Remove failed" });
  }
};

const getWatchlistController = async (req, res) => {
  try {
    const list = await Watchlist.findOne({ user: req.user.id });
    res.json({ symbols: list ? list.symbols : [] });
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
};

module.exports = {
  addToWatchlistController,
  removeFromWatchlistController,
  getWatchlistController
};
