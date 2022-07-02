const knex = require("../../../lib/knex");

module.exports = (req, res, next) => {
  knex("book")
    .select()
    .orderBy("createdAt", "desc")
    .then(result => {
      res.json(result);
    })
    .catch(next);
};
