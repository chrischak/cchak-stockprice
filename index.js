const express = require("express");
const keys = require("./config/keys");
const alpha = require("alphavantage")({ key: keys.alphaVantage });
const slackBot = require("slackbots");

const app = express();
const bot = new slackBot({
  token: keys.botToken,
  name: "stockprice"
});

getBotID();

async function getBotID() {
  let data = await bot.getUsers();
  for (id in data.members) {
    if (data.members[id].name == bot.name) {
      let botID = await data.members[id].id;
      message(botID);
    }
  }
}

function message(botID) {
  bot.on("message", function(data) {
    if (data.type !== "message") {
      return;
    }
    //work only for app_mention
    //work only the one mention is bot
    if (data.text.includes(botID)) {
      handleMessage(
        data.text.split("<@" + botID + ">")[1].trim(),
        data.channel
      );
    }
  });
}

function handleMessage(message, channel) {
  console.log("handleMessage: ", message, channel);
  switch (message.length) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      const ticker = message;
      getStockPrice(ticker, channel);
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
async function getStockPrice(ticker, channel) {
  try {
    let data = await alpha.data.intraday(ticker);
    const StockPrice =
      data[Object.keys(data)[1]][Object.keys(data[Object.keys(data)[1]])[0]][
        "4. close"
      ];
    bot.postMessage(channel, StockPrice);
  } catch (err) {
    bot.postMessage(channel, "Invalid entries");
  }
}

//CURRENCY_EXCHANGE_RATE
async function getCurrencyExchangeRate(from_currency, to_currency, channel) {
  try {
    let data = await alpha.forex.rate(from_currency, to_currency);
    const CurrencyExchangeRate = data[Object.keys(data)[0]]["5. Exchange Rate"];
    bot.postMessage(channel, CurrencyExchangeRate);
  } catch (err) {
    bot.postMessage(channel, "Invalid entries");
  }
}

app.get("/", function(req, res) {
  res.send("slack bot: stockprice");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);
