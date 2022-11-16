class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

const createError = (message, status) => {
  if (!status) status = 400;
  throw new CustomError(message, status);
};

const routeNotFound = (req, res) =>
  res.status(404).json({ message: "Route not found" });

const asyncErrorWrapper = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

module.exports = {
  createError,
  routeNotFound,
  asyncErrorWrapper,
  errorHandler,
};
