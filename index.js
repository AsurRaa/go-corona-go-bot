import Telegraf from "telegraf";
import Telegram from "telegraf/telegram";
import Scraping from "./scraping";
import { day, today } from "./utils/todayKH";
require("dotenv").config();

const main = async () => {
  let data = await Scraping();
  console.log("getting data", await Scraping());
  const message = `ព័ត៌មានផ្លូវការ អំពី Covid-19 នៅកម្ពុជា 
  គិតត្រឹម "ថ្ងែ${day[0]}, ${today}"
  - ចំនួនអ្នកឆ្លង៖ " ${data[0].cases} នាក់ "
  - ចំនួនអ្នកជាសះស្បើយ៖ " ${data[2].recovered} នាក់ "
  - ចំនួនអ្នកស្លាប់៖ " ${data[1].dies} នាក់ "
  `;

  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start((ctx) => ctx.reply("Welcome"));
  bot.help((ctx) => ctx.reply("Send me a sticker"));
  bot.on("sticker", (ctx) => ctx.reply("👍"));
  bot.hears("hi", (ctx) => ctx.reply("Hey there"));
  bot.command("covid", (ctx) => ctx.reply("hi from covid"));
  bot.hears("corona", (ctx) => ctx.reply(message));
  bot.command("corona", (ctx) => ctx.reply(message));
  bot.launch();
  console.log("bot is starting");

  console.log("telegram is init");
  const telegram = new Telegram(process.env.BOT_TOKEN);
};

main();
