module.exports = (controller) => {
  controller.on('facebook_postback', (bot, message) => {
    if (message.payload === 'chat_started') {
      const attachment = {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Use the buttons below or type a question :D',
          buttons: [
            {
              type: 'postback',
              title: 'Item 1',
              payload: 'item1',
            },
            {
              type: 'postback',
              title: 'Item 2',
              payload: 'item2',
            },
          ],
        },
      };

      bot.replyWithTyping(message, {
        attachment,
      });
    }

    if (message.payload === 'item1') {
      bot.replyWithTyping(message, 'Item1!');
    }

    if (message.payload === 'item2') {
      bot.replyWithTyping(message, 'Item2!');
    }
  });


  controller.hears(['hello'], 'message_received,chat_started', (bot, message) => {
    bot.replyWithTyping(message, 'Hey, there!');
  });

  controller.hears('(.*)', 'message_received', (bot, message) => {
    bot.replyWithTyping(message, `you said ${message.match[1]}`);
  });
};
