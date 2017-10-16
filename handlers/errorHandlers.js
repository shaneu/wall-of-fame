exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.logErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
};
