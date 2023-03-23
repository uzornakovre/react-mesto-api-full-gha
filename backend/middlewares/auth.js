const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../config');
const { UNAUTHORIZED } = require('../utils/resStatus');

function extractBearerToken(header) {
  return header.replace('Bearer ', '');
}

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next({ statusCode: UNAUTHORIZED.CODE, message: UNAUTHORIZED.MESSAGE });
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'key',);
  } catch (err) {
    next({ statusCode: UNAUTHORIZED.CODE, message: UNAUTHORIZED.MESSAGE });
  }

  req.user = payload;

  next();
};
