const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.SECRET_KEY
  );
};

const validateRequest = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    res.status(400).send('Please provide token');
    return;
  }

  const bearer = tokenHeader.split(' ')[0];
  if (!bearer || bearer !== 'Bearer') {
    res.status(400).send('Invalid header');
    return;
  }

  const token = tokenHeader.split(' ')[1];
  if (!token) {
    res.status(400).send('Invalid header');
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send('Unathorized');
      return;
    }
    next();
  });
}

module.exports = { generateToken, isAuthenticated: validateRequest };