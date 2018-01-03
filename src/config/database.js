/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect('mongodb://localhost/messenger-bot')
  .then(() => console.warn('Database connection succesful'))
  .catch(error => console.error(error));
