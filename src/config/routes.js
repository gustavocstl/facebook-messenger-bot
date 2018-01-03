const express = require('express');
const Conversations = require('../models/conversations/conversationService');

module.exports = (server) => {
  const api = express.Router();

  server.use('/api', api);

  Conversations.register(api, '/conversations');
};
