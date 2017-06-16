/* .env lib */
require('dotenv').config();

/* Dependencies */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

/* Express initialization */
const app = express();

/* Logger */
const LoggerConfig = require('./config/LoggerConfig');
const Logger = require('./helpers/Logger');

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Log express request and response */
LoggerConfig.expressRequest(app);

/* Instatiate modules */
app.use('/user', require('./user/user'));

/* Status endpoint */
app.get('/status', (req, res) => {
  res.send('ok');
});

/* Log errors */
LoggerConfig.expressError(app);

app.all('*', (req, res) => {
  Logger.warning('Not Found');
  res.status(404).send({ success: false, code: '404' });
});

/* Startup message */
app.listen(process.env.PORT, () => {
  /* Configure Log */
  LoggerConfig.init();
  Logger.info(`Server started on port ${process.env.PORT}`);
});
