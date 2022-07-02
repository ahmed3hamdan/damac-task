const createError = require("http-errors");
const ajv = require("../../../lib/ajv");

const validateBook = ajv.compile({
  type: "object",
  properties: {
    name: { type: "string", maxLength: 300 },
    imageUrl: { type: "string", format: "url", default: null },
    author: { type: "string", maxLength: 100 },
    pages: { type: "integer", minimum: 0 },
    price: { type: "number", minimum: 0 },
  },
  required: ["name", "author", "pages", "price"],
  additionalProperties: false,
});

module.exports = (req, res, next) => {
  if (validateBook(req.body)) {
    return next();
  }
  next(createError(422));
};
