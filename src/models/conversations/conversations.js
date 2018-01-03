const restful = require('node-restful');

const { mongoose } = restful;

const ConversationsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['postback', 'message_received'],
  },
  payload: { type: String },
  hears: { type: Array },
  response: mongoose.Schema.Types.Mixed,
  created_at: { type: Date, default: Date.now },
});

module.exports = restful.model('Conversations', ConversationsSchema);
