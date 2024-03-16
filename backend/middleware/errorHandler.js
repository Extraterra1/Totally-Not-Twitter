const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({ err: err.message, type: err.name });
};

module.exports = errorHandler;
