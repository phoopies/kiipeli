const unknownEndpoint = (req, res) => {
  res.redirect('/');
  // res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  return next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  if (token) {
    request.token = token;
  }
  return next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
