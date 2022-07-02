const createError = require("http-errors");
const knex = require("../../../lib/knex");

module.exports = (req, res, next) => {
  knex("book")
    .where({ id: req.params.bookId })
    .del()
    .then(rowsDeleted => {
      if (rowsDeleted === 1) {
        return res.sendStatus(200);
      }
      next(createError(404));
    })
    .catch(next);
};
