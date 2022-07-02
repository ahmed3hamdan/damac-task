const createError = require("http-errors");

module.exports = (req, res, next) => {
  if (res.locals.userId) {
    return next();
  }
  next(createError(403));
};