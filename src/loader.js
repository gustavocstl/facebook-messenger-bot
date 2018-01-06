if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./controllers/bot');
require('./config/database');
