const notFoundMiddleware = (err, req, res, next) => {
  return res
    .status(404)
    .json({ status: 'fail', error: 'Route does not exist!' });
};

export default notFoundMiddleware;
