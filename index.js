const express = require("express");
const keys = require("./config/keys");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/", function(req, res) {
  const CHALLENGE = req.body.challenge;
  res.send({ challenge: CHALLENGE });
});
//exchange
app.get("/", (req, res) => {
  res.json({ hi: keys.alphaVantage });
});

//stock
const PORT = process.env.PORT || 5000;
app.listen(PORT);
