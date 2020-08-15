const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

// helper function, from readings, gets the bearer+token
// then returns the token string (w/o "bearer " word)
const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  req.token =
    auth && auth.toLowerCase().startsWith("bearer ") ? auth.substring(7) : null;
  next();
};

module.exports = {
  requestLogger,
  tokenExtractor,
};
