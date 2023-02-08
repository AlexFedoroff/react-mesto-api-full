/*
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET = 'dev-key', NODE_ENV } = process.env;

const UnauthorizedError = require('../utils/unauthorized-error');

const auth = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
*/
const { checkToken } = require('../utils/jwt');
const UnauthorizedError = require('../utils/unauthorized-error');

module.exports = (req, _, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new UnauthorizedError('Необходима авторизация!'));
  try {
    req.user = checkToken(token);
    return next();
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
};
