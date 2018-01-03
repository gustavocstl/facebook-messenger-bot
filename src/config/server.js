const bodyParser = require('body-parser');
const express = require('express');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
server.listen(process.env.API_PORT, () => console.warn(`API is running on ${process.env.API_PORT}.`));

module.exports = server;
