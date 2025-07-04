const axios = require("axios");

const getStockPriceController = async (req, res) => {
  try {
    const { symbol } = req.params;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
    const response = await axios.get(url);
    const data = response.data["Global Quote"];

    if (!data) return res.status(404).json({ message: "Stock not found" });

    res.json({
      symbol: data["01. symbol"],
      price: data["05. price"],
      open: data["02. open"],
      high: data["03. high"],
      low: data["04. low"],
      volume: data["06. volume"]
    });
  } catch (err) {
    res.status(500).json({ error: "Stock fetch failed" });
  }
};

const compareStocksController = async (req, res) => {
  const { symbols } = req.body;
  try {
    const results = [];

    for (const symbol of symbols) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
      const resData = await axios.get(url);
      const data = resData.data["Global Quote"];
      if (data) {
        results.push({
          symbol: data["01. symbol"],
          price: data["05. price"]
        });
      }
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Comparison failed" });
  }
};

module.exports = {
  getStockPriceController,
  compareStocksController
};
