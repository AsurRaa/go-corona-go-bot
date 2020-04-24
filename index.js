"use strict";

require("dotenv").config();
const color = require("colors");
const Telegraf = require("telegraf");
const scraping = require("./scraping");

const message = `ព័ត៌មានផ្លូវការ អំពី Covid-19 នៅកម្ពុជា 

គិតត្រឹម "ថ្ងៃទី២៣ មេសា ២០២០"
- ចំនួនអ្នកឆ្លង៖ " ១២២ នាក់ "
- ចំនួនអ្នកជាសះស្បើយ៖ " ១១០ នាក់ "
- ចំនួនអ្នកស្លាប់៖ គ្មាន
`;

// run scraping
scraping();
console.log(color.red("Scaping Script is running !!!"));

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.command("covid", (ctx) => ctx.reply("hi from covid"));
bot.hears("corona", (ctx) => ctx.reply(message));
bot.launch();
