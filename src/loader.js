require('dotenv').config();

const server = require('./config/server');
require('./config/routes')(server);
require('./controllers/bot');
require('./config/database');
