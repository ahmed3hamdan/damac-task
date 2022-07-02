const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("../../../lib/config");
const knex = require("../../../lib/knex");

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  knex("user")
    .where({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password.toString())) {
        const token = jwt.sign({}, config.JWT_SECRET, {
          subject: user.id.toString(),
          audience: "authentication",
        });
        return res.json(token);
      }
      next(createError(401));
    })
    .catch(next);
};
