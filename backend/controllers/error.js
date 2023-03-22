const { NOT_FOUND } = require('../utils/resStatus');

module.exports.error = (req, res, next) => {
  next({ statusCode: NOT_FOUND.CODE, message: NOT_FOUND.PAGE_MESSAGE });
};
