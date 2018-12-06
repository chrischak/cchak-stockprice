const express = require("express");
const keys = require("./config/keys");
const request = require("request");
const bodyParser = require("body-parser");
var SlackBot = require("slackbots");
var channel = "general";

var bot = new SlackBot({
  token: keys.botToken,
  name: "stockprice"
});

bot.on("start", function() {
  bot.postMessageToChannel(channel, "Hello world!");
  console.log("Hello world!");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", function(req, res) {
  const BOT = req.body;
  var msg = {
    text: "This is a line of text.\nAnd this is another one."
  };
  res.send({
    challenge: BOT.challenge,
    token: BOT.token,
    channel: BOT.channel,
    text: "Hello World"
  });
});
//exchange
const API_URL = "https://www.alphavantage.co/query";
var data = {
  function: "CURRENCY_EXCHANGE_RATE",
  from_currency: "USD",
  to_currency: "CAD",
  apikey: keys.alphaVantage
};
var url =
  API_URL +
  "?function=" +
  data.function +
  "&from_currency=" +
  data.from_currency +
  "&to_currency=" +
  data.to_currency +
  "&apikey=" +
  data.apikey;

request(
  {
    url
  },
  function(error, response, body) {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log(
      "body:",
      JSON.parse(body)["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    );
    app.get("/", function(req, res) {
      res.send(JSON.parse(body));
    });
  }
);

//stock
const PORT = process.env.PORT || 5000;
app.listen(PORT);
