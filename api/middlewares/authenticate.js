const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("../lib/config");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace(/^Bearer\s/, "");
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET, {
        audience: "authentication",
      });
      res.locals.userId = decoded.sub;
      return next();
    } catch (error) {
      return next(createError(401));
    }
  }

  next();
};
