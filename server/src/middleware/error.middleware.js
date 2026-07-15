module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found (invalid id)' });
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};