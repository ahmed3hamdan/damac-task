const { isHttpError } = require("http-errors");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (isHttpError(err)) {
    res.status(err.statusCode);
    return res.send(err.message);
  }

  console.log(err.message);
  res.sendStatus(500);
};
