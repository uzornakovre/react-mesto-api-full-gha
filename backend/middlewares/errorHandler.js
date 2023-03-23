const { INTERNAL } = require('../utils/resStatus');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  let message;
  if (statusCode === INTERNAL.CODE) {
    message = INTERNAL.MESSAGE;
  } else {
    message = err.message;
  }

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
