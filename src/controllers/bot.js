const botkit = require('botkit');

const controller = botkit.facebookbot({
  access_token: process.env.ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN,
});

const bot = controller.spawn({});

require('./setup');

controller.setupWebserver(process.env.PORT, () => {
  controller.createWebhookEndpoints(controller.webserver, bot, () => {
    console.log('Bot online!');
  });
});

require('./conversations')(controller);
