const express = require("express");
const keys = require("./config/keys");
const alpha = require("alphavantage")({ key: keys.alphaVantage });
const slackBot = require("slackbots");

const app = express();
const bot = new slackBot({
  token: keys.botToken,
  name: "stockprice"
});

bot.on("start", function() {
  var list = bot.getUsers();
  bot.postMessage("UELA27WHJ", "Hello world!");
  console.log("Hello world!", list);
});

bot.on("message", function(data) {
  console.log(data);
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text, data.channel);
});

function handleMessage(message, channel) {
  console.log(message, channel);
  switch (message.length) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      const ticker = message;
      //getStockPrice(ticker, channel);
      break;
    case 6:
      const from_currency = message.substring(0, 3);
      const to_currency = message.substring(3, 6);
      getCurrencyExchangeRate(from_currency, to_currency, channel);
      break;
    default:
      return;
  }
}

//stockprice
function getStockPrice(ticker, channel) {
  alpha.data
    .intraday(ticker)
    .then(data => {
      const StockPrice =
        data[Object.keys(data)[1]][Object.keys(data[Object.keys(data)[1]])[0]][
          "4. close"
        ];
      bot.postMessage(channel, StockPrice);
    })
    .catch(err => {
      bot.postMessage(channel, "Invalid entries");
    });
}

//CURRENCY_EXCHANGE_RATE
function getCurrencyExchangeRate(from_currency, to_currency, channel) {
  alpha.forex
    .rate(from_currency, to_currency)
    .then(data => {
      const CurrencyExchangeRate =
        data[Object.keys(data)[0]]["5. Exchange Rate"];
      bot.postMessage(channel, CurrencyExchangeRate);
    })
    .catch(err => {
      bot.postMessage(channel, "Invalid entries");
    });
}

app.get("/", function(req, res) {
  res.send("slack bot: stockprice");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);
