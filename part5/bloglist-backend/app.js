const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("[ Connecting to", config.MONGODB_URI, "]");

mongoose.set("useFindAndModify", false);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => logger.info("[ Connected to MongoDB ]"))
  .catch((err) =>
    logger.error("[ Error connecting to MongoDB =>", err.message, "]")
  );

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// middleware
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

// defining the paths
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// only add testing api if run on test-mode
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

module.exports = app;
