const { Telegraf } = require("telegraf");
const TOKEN = "6875305967:AAH70nRbXbN4t4RBnwi6cHRDHCJit094bfU";
const bot = new Telegraf(TOKEN);

const web_link = "https://celebrated-torte-184681.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
