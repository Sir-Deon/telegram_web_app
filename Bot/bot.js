const { Telegraf } = require("telegraf");
const TOKEN = "6875305967:AAH70nRbXbN4t4RBnwi6cHRDHCJit094bfU";
const bot = new Telegraf(TOKEN);

const web_link = "https://isfoody.netlify.app";
const bot_url= "https://t.me/isfoody_bot."

bot.start((ctx) =>
  ctx.reply("Welcome :))))) \n to foody", {
    reply_markup: {
      inline_keyboard: [[{ text: "Visit Foody", url: bot_url  }]],
    },
  })
);


bot.launch();
