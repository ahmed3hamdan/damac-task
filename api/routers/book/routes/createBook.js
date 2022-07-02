const knex = require("../../../lib/knex");

module.exports = (req, res, next) => {
  knex("book")
    .insert(req.body)
    .then(() => res.sendStatus(200))
    .catch(next);
};