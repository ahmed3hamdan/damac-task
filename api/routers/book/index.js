const express = require("express");
const bodyParser = require("body-parser");
const createBook = require("./routes/createBook");
const deleteBookById = require("./routes/deleteBookById");
const getBookById = require("./routes/getBookById");
const listBooksRoute = require("./routes/listBooks");
const updateBookById = require("./routes/updateBookById");
const validateBook = require("./middlewares/validateBook");
const validateParams = require("./middlewares/validateParams");

const router = express.Router();

// Create a new book
router.post("/", bodyParser.json(), validateBook, createBook);

// Delete an existing book
router.delete("/:bookId", validateParams, deleteBookById);

// Get a specific book
router.get("/:bookId", validateParams, getBookById);

// List Books
router.get("/", listBooksRoute);

// Update an existing book
router.put(
  "/:bookId",
  validateParams,
  bodyParser.json(),
  validateBook,
  updateBookById
);

module.exports = router;
