const createError = require("http-errors");
const ajv = require("../../../lib/ajv");

const validateParam = ajv.compile({
  type: "object",
  properties: {
    bookId: { type: "integer", minimum: 0 },
  },
  required: ["bookId"],
  additionalProperties: false,
});

module.exports = (req, res, next) => {
  if (validateParam(req.params)) {
    return next();
  }
  next(createError(422));
};
