const createError = require("http-errors");
const knex = require("../../../lib/knex");

module.exports = (req, res, next) => {
  knex("book")
    .where({ id: req.params.bookId })
    .first()
    .then(result => {
      if (result) {
        return res.json(result);
      }

      next(createError(404));
    })
    .catch(next);
};
