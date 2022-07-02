const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../../middlewares/authenticate");
const isUser = require("../../middlewares/isUser");
const validateLogin = require("./middlewares/validateLogin");
const login = require("./routes/login");
const profile = require("./routes/profile");

const router = express.Router();

// Create authentication token
router.post("/login", bodyParser.json(), validateLogin, login);

// Get user profile
router.get("/profile", authenticate, isUser, profile);

module.exports = router;
