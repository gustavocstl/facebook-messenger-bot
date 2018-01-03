const Conversations = require('./conversations');

Conversations.methods(['get', 'post', 'put', 'delete']);
Conversations.updateOptions({ new: true, runValidators: true });

module.exports = Conversations;
