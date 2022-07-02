const ajv = require("./ajv");

const validateConfig = ajv.compile({
  type: "object",
  properties: {
    PORT: { type: "string", default: "4000" },
    PG_CONNECTION_STRING: { type: "string" },
    INITIAL_USER_EMAIL: { type: "string", format: "email" },
    INITIAL_USER_PASSWORD: { type: "string", minLength: 8, maxLength: 72 },
    JWT_SECRET: { type: "string" },
  },
  required: [
    "PORT",
    "PG_CONNECTION_STRING",
    "INITIAL_USER_EMAIL",
    "INITIAL_USER_PASSWORD",
    "JWT_SECRET",
  ],
  additionalProperties: false,
});

const {
  PORT,
  PG_CONNECTION_STRING,
  INITIAL_USER_EMAIL,
  INITIAL_USER_PASSWORD,
  JWT_SECRET,
} = process.env;

const config = {
  PORT,
  PG_CONNECTION_STRING,
  INITIAL_USER_EMAIL,
  INITIAL_USER_PASSWORD,
  JWT_SECRET,
};

// validate and transform configurations from environment variables
if (!validateConfig(config)) {
  const { instancePath, message } = validateConfig.errors[0];
  console.log(`invalid configuration: ${instancePath} ${message}`);
  process.exit(1);
}

module.exports = config;
