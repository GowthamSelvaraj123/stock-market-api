const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");

app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/stocks", require("./routes/stock.routes"));
app.use("/api/watchlist", require("./routes/watchlist.routes"));

app.get("/", (req, res) => {
  res.send("Stock Market API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
