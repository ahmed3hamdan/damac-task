const createError = require("http-errors");
const knex = require("../../../lib/knex");

module.exports = (req, res, next) => {
  knex("book")
    .update({ ...req.body, updatedAt: knex.fn.now() })
    .where({ id: req.params.bookId })
    .then(rowsUpdated => {
      if (rowsUpdated === 1) {
        return res.sendStatus(200);
      }
      return next(createError(404));
    })
    .catch(next);
};
