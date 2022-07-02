const knex = require("../../../lib/knex");

module.exports = (req, res, next) => {
  knex("user")
    .where({ id: res.locals.userId })
    .first()
    .then(({ password, ...profile }) => res.json(profile))
    .catch(next);
};
