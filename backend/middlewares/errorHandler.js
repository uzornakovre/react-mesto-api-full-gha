const { INTERNAL } = require('../utils/resStatus');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === INTERNAL.CODE ? INTERNAL.MESSAGE : err.message;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
