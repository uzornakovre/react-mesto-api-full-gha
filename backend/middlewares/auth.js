const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
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
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next({ statusCode: UNAUTHORIZED.CODE, message: UNAUTHORIZED.MESSAGE });
  }

  req.user = payload;

  next();
};
