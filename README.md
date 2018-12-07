## cchak-stockprice

## slack bot

Demo:
https://join.slack.com/t/cchak/shared_invite/enQtNDk4OTM0NDI2NTUxLTFiN2MyZTNkNzRkMDA3YTZmNGFkYjkyZDU1M2JlZDJiMTMwOWEwNWFkNWVhNzYxZjNjMmIwODVjMWY4MmM0MTM

It should work with Forex Market (currency exchange).
When we type in the channel "@stockprice usdcad"
Bot will reply with ex: "1.3388"

It should work with Stock Market.
When we type in the channel "@stockprice googl"
Bot will reply with ex: "1062.4789"

install nodejs

install npm

create new slack bot name "stockprice"

cd server

create config/dev.js

//dev.js

module.exports = {
alphaVantage: your_API_Key,
botToken: your_bot_token
};

//EOF

npm install

npm run dev
