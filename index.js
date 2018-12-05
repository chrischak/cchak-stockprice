const express = require("express");
const app = express();
const keys = require("./config/keys");

app.get("/", (req, res) => {
  res.send({ hi: keys.alphaVantage });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
