const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
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
app.use(express.static('build'))
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
