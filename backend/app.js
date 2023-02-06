const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 2800 } = process.env;

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://alexfedoroff.nomoredomainsclub.ru',
    'https://alexfedoroff.nomoredomainsclub.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true,
  });

app.listen(PORT, () => {
  console.log(`The App is running and listening to port ${PORT}`);
});
