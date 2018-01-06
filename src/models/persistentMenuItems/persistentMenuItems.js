const restful = require('node-restful');

const { mongoose } = restful;

const itemSchema = {
  type: {
    type: String,
    required: true,
    enum: ['postback', 'nested', 'web_url'],
  },
  url: {
    type: String,
    required: function () {
      return this.type === 'web_url';
    },
  },
  payload: {
    type: String,
    required: function () {
      return this.type === 'postback';
    },
  },
  title: { type: String, required: true },
};

const PersistentMenuItemsSchema = new mongoose.Schema({
  ...itemSchema,
  call_to_actions: {
    type: [new mongoose.Schema(itemSchema)],
    required: function () {
      return this.type === 'nested';
    },
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = restful.model('PersistentMenuItems', PersistentMenuItemsSchema);
