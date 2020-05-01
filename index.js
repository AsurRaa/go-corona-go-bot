import Telegraf from "telegraf";
import color from "colors";
import Scraping from "./scraping";
import { day, today } from "./utils/todayKH";
import moment from "moment";

const TelegrafInlineMenu = require("telegraf-inline-menu");
require("dotenv").config();

const main = async () => {
  let country;
  let data = await Scraping("Cambodia");
  console.log("data", await Scraping("cambodia"));
  const message = `ព័ត៌មានផ្លូវការ អំពី Covid-19 នៅកម្ពុជា 
  គិតត្រឹម "ថ្ងែ${day[0]}, ${today}"
  - ចំនួនអ្នកឆ្លង៖ " ${data[0].cases} នាក់ "
  - ចំនួនអ្នកជាសះស្បើយ៖ " ${data[2].recovered} នាក់ "
  - ចំនួនអ្នកស្លាប់៖ " ${data[1].dies} នាក់ "
  `;

  const renderMessage = async (country) => {
    let data = await Scraping(country);
    console.log(`case in ${country}`, await Scraping(country));
    let today = moment().format("MMMM Do YYYY");
    return `Today case in ${country} at ${today} : 
            case : ${data[0].cases}
            death : ${data[2].recovered}
            recovered : ${data[1].dies}
    `;
  };

  const bot = new Telegraf(process.env.BOT_TOKEN, {
    telegram: {
      webhookReply: true,
    },
  });
  bot.start((ctx) => {
    return [
      ctx.replyWithPhoto("https://imgflip.com/i/3y9wn6"),
      ctx.reply("Noobb purom mother fucker"),
    ];
  });

  // bot.command("game", (ctx) => {
  //   console.log("context rendering", ctx.chat.id);
  //   let messageId = ctx.chat.id;
  //   return ctx.telegram.sendGame();
  // });
  // bot.use((ctx) => console.log("context mother fucker", ctx.message));

  // bot.help((ctx) => ctx.reply("Send me a sticker"));
  bot.on("sticker", (ctx) => {
    let chatId = ctx.chat.id;
    return [
      ctx.telegram.sendVoice(
        chatId,
        "https://upload.wikimedia.org/wikipedia/commons/a/af/United_States_Navy_Band_-_Nokoreach.ogg"
      ),
    ];
  });
  // bot.hears("hi", (ctx) => ctx.reply("Hey there"));
  // bot.command("covid", (ctx) => ctx.reply("hi from covid"));

  // bot.command("lyhour", (ctx) => console.log("context from command", ctx));

  // bot.hears("Corona", (ctx) => ctx.reply(message));
  // bot.command("Corona", (ctx) => ctx.reply(message));
  // bot.hears("game", (ctx) => ctx.reply("hi"));
  const menu = new TelegrafInlineMenu((ctx) => `Hey ${ctx.from.first_name}!`);
  menu.setCommand("menu");
  menu.simpleButton("Show CODVID-19 Cases in Cambodia Today", "a", {
    // doFunc: (ctx) => ctx.reply("As am I!"),
    doFunc: (ctx) => ctx.reply(message),
  });
  menu.simpleButton("Another Country", "b", {
    doFunc: (ctx) => {
      return ctx.hears(country), ctx.reply(renderMessage(country));
    },
  });

  bot.use(menu.init());
  bot.startPolling();
  bot.launch();

  console.log(color.red("bot is starting..."));
};

main();
