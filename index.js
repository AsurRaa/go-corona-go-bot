import Telegraf from "telegraf";

import color from "colors";
import Scraping from "./scraping";
import { day, today } from "./utils/todayKH";
import moment from "moment";
const Markup = require("telegraf/markup");
const TelegrafInlineMenu = require("telegraf-inline-menu");
require("dotenv").config();

const testString = `
// =>
//                                 ▲
//                                 │
//                         • • • • • • • • •
//                     • •         │         • •
//                 • •             │             • •
//               •                 │                 •
//             •                   │                   •
//           •                     │                     •
//         •                       │                       •
//         •                       │                       •
//       •                         │                         •
//       •                         │                         •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//     •                           │                           •
//       •                         │                         •
//       •                         │                         •
//         •                       │                       •
//         •                       │                       •
//           •                     │                     •
//             •                   │                   •
//               •                 │                 •
//                 • •             │             • •
//                     • •         │         • •
//                         • • • • • • • • •
//                                 │
`;

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
      // ctx.replyWithPhoto("https://imgflip.com/i/3y9wn6"),
      ctx.replyWithMarkdown(
        `Gretting ${ctx.from.first_name}! welcome to COVID-19 cases alert which happened in Cambodia.\nThis bot aim to provide to data of COVID-19 Through telegram.\n*Powered by Asurra Technology*.\nHere some help !!!\n/menu => Show menu of the bot.`
      ),
      ctx.reply("👍"),
    ];
  });

  bot.on("sticker", (ctx) => {
    let chatId = ctx.chat.id;
    return [
      ctx.telegram.sendVoice(
        chatId,
        "https://upload.wikimedia.org/wikipedia/commons/a/af/United_States_Navy_Band_-_Nokoreach.ogg"
      ),
    ];
  });

  // With middleware
  const menu = new TelegrafInlineMenu((ctx) => `Hey ${ctx.from.first_name}!`);
  menu.setCommand("menu");

  menu.simpleButton("Cambodia", "a", {
    doFunc: (ctx) => ctx.reply(message),
  });
  menu.simpleButton("Another Country", "b", {
    doFunc: (ctx) => ctx.reply("As am I!"),
  });

  // test
  bot.command("test", (ctx) =>
    ctx.reply(
      "Hi!",
      Markup.inlineKeyboard([Markup.callbackButton("text", "my-callback-data")])
    )
  );

  bot.command("graph", (ctx) => {
    ctx.reply(testString);
  });

  bot.command("hook", (ctx) => {
    console.log(
      "rebder context",
      ctx.telegram.setWebhook("http://localhost:3000/")
    );
    return ctx.reply(ctx.botInfo);
  });

  bot.action("my-callback-data", (ctx) => ctx.answerCbQuery("lalalal"));

  bot.use(menu.init());
  bot.launch();
  console.log(color.red("bot is starting..."));
};

main();
