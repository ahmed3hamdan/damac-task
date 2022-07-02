const createError = require("http-errors");
const ajv = require("../../../lib/ajv");

const validateLogin = ajv.compile({
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
});

module.exports = (req, res, next) => {
  if (validateLogin(req.body)) {
    return next();
  }
  next(createError(422));
};
