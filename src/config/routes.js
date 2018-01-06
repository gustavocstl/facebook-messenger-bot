const express = require('express');
const Conversations = require('../models/conversations/conversationService');

module.exports = (server, controller) => {
  const api = express.Router();
  server.use('/api', api);
  Conversations.register(api, '/conversations');

  server.post('/facebook/receive', (request, response) => {
    response.status(200);
    response.send('ok');

    const bot = controller.spawn({});
    controller.handleWebhookPayload(request, response, bot);
  });

  server.get('/facebook/receive', (request, response) => {
    if (request.query['hub.mode'] === 'subscribe') {
      if (request.query['hub.verify_token'] === controller.config.verify_token) {
        response.send(request.query['hub.challenge']);
      } else {
        response.send('OK');
      }
    }
  });
};
