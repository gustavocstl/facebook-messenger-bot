const botkit = require('botkit');

const controller = botkit.facebookbot({
  access_token: process.env.ACCESS_TOKEN,
  verify_token: process.env.VERIFY_TOKEN,
});

require('./setup');
require('../config/server')(controller);
require('./conversations')(controller);
