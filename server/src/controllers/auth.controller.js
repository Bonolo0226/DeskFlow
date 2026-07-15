const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { name, role } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'name is required' });
  }
  if (!['Employee', 'Admin'].includes(role)) {
    return res.status(400).json({ message: "role must be 'Employee' or 'Admin'" });
  }

  const token = jwt.sign(
    { id: name.trim(), name: name.trim(), role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.status(200).json({ token, user: { name: name.trim(), role } });
};