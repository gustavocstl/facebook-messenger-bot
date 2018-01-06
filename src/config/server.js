const bodyParser = require('body-parser');
const express = require('express');

module.exports = (controller) => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  server.listen(process.env.PORT || 3000, () => console.warn(`API is running on ${process.env.PORT || 3000}.`));

  require('../config/routes')(server, controller);

  controller.webserver = server;

  return server;
}
