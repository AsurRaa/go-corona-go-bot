import Telegraf from "telegraf";

import voca from "voca";
import cheerio from "cheerio";
import words from "voca/words";
import moment, { locale } from "moment";
require("dotenv").config();
const request = require("request");

const today = moment(new Date(), locale("km")).format("ll");
const todayWithDay = moment(new Date(), locale("km")).format("LLLL");
const day = voca(todayWithDay).chain().lowerCase().words().value();
const country = "cambodia";

let data = [];

request(
  `https://www.worldometers.info/coronavirus/country/${country}/`,
  (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);

      let hook = $(".maincounter-number");
      const arrayData = words(hook.text());
      console.log(arrayData);
      data.push({
        cases: arrayData[0],
        die: arrayData[1],
        recovered: arrayData[2],
      });
    }
  }
);

console.log("hwhwhwh", data);
const message = `ព័ត៌មានផ្លូវការ អំពី Covid-19 នៅកម្ពុជា 
គិតត្រឹម "ថ្ងែ${day[0]}, ${today}"
- ចំនួនអ្នកឆ្លង៖ " ១២២ នាក់ "
- ចំនួនអ្នកជាសះស្បើយ៖ " ១១០ នាក់ "
- ចំនួនអ្នកស្លាប់៖ គ្មាន
`;

// const main = async () => {
//   const bot = new Telegraf(process.env.BOT_TOKEN);
//   bot.start((ctx) => ctx.reply("Welcome"));
//   bot.help((ctx) => ctx.reply("Send me a sticker"));
//   bot.on("sticker", (ctx) => ctx.reply("👍"));
//   bot.hears("hi", (ctx) => ctx.reply("Hey there"));
//   bot.command("covid", (ctx) => ctx.reply("hi from covid"));
//   bot.hears("corona", (ctx) => ctx.reply(message));
//   bot.launch();
// };

// main();
