require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const corsOptions = ['http://localhost:3000', 'http://alexfedoroff.nomoredomainsclub.ru', 'https://alexfedoroff.nomoredomainsclub.ru'];

const { PORT = 2800 } = process.env;

const app = express();

app.use(cors(corsOptions));

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('*', cors);
// app.use(cors);
app.use(bodyParser.json());
app.use(cookieParser());

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
  console.log(`The App v.0.9992 is running and listening to port ${PORT}`);
});
