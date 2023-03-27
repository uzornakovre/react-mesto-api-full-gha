const { NOT_FOUND } = require('../utils/resStatus');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.error = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND.PAGE_MESSAGE));
};
