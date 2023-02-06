const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const corsErr = require('./middlewares/cors');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 2800 } = process.env;

const app = express();

app.use(cors());

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
app.use(corsErr);
mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true,
  });

app.listen(PORT, () => {
  console.log(`The App is running and listening to port ${PORT}`);
});
