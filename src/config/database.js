/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => console.warn('Database connection succesful'))
  .catch(error => console.error(error));
