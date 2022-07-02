const express = require("express");
const config = require("./lib/config");
const bookRouter = require("./routers/book");
const errorHandler = require("./middlewares/errorHandler");
const defaultNotFound = require("./middlewares/defaultNotFound");

const app = express();

const apiRouter = express.Router();

apiRouter.use("/book", bookRouter);

app.use("/api", apiRouter);

app.use(defaultNotFound);
app.use(errorHandler);

app.listen(config.PORT);
