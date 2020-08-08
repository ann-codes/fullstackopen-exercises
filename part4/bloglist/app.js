const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("[ Connecting to", config.MONGODB_URI, "]");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("[ Connected to MongoDB ]"))
  .catch((err) =>
    logger.error("[ Error connecting to MongoDB =>", err.message, "]")
  );

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// defining the primary path
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter); 

module.exports = app;
