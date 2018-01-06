/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.warn('Database connection succesful'))
  .catch(error => console.error(error));
