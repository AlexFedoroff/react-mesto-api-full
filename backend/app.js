const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 2800 } = process.env;

// const allowedOrigins = ['http://localhost:5173'];
const app = express();

mongoose.set('strictQuery', false);

// app.use(cors);
app.use(requestLogger);

app.use(bodyParser.json());

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true,
  });

app.listen(PORT, () => {
});
