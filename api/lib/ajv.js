const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({
  useDefaults: true,
  removeAdditional: true,
  coerceTypes: true
});
addFormats(ajv);

module.exports = ajv;
