const mongoose = require('mongoose');

const Conversations = mongoose.model('Conversations');

module.exports = (controller) => {
  function botReply(bot, message, response) {
    if (typeof response === 'object') {
      bot.replyWithTyping(message, { attachment: response });
    }

    bot.replyWithTyping(message, response);
  }

  controller.on('facebook_postback', (bot, message) => {
    Conversations.findOne(
      { payload: message.payload },
      (error, conversation) => {
        if (!conversation) return false;
        return botReply(bot, message, conversation.response);
      },
    );
  });

  controller.hears('(.*)', 'message_received', (bot, message) => {
    const hears = message.match[1].split(' ');

    Conversations.findOne(
      { hears: { $elemMatch: { $in: hears } } },
      (error, conversation) => {
        if (!conversation) return false;
        return botReply(bot, message, conversation.response);
      },
    );
  });
};
