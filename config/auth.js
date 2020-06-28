const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      date: user.date,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_VALIDITY
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      date: user.date,
      role: user.role
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_VALIDITY
    }
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

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send('Unathorized');
      return;
    }
    next();
  });
}

module.exports = { generateAccessToken, generateRefreshToken, isAuthenticated: validateRequest };