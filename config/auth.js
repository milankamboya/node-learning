const jwt = require('jsonwebtoken');
const invalidTokensMap = new Map();

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
    return res.status(400).send('Please provide token');
  }

  const bearer = tokenHeader.split(' ')[0];
  if (!bearer || bearer !== 'Bearer') {
    return res.status(400).send('Invalid header');
  }

  const token = tokenHeader.split(' ')[1];
  if (!token) {
    return res.status(400).send('Invalid header');
  }

  if (checkInvalidTokenInfo(token)) {
    return res.status(404).send('Token Invalid');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send(err);
    }
    next();
  });
}

const setInvalidTokenInfo = (accessToken, refreshToken) => {
  invalidTokensMap.set(accessToken, refreshToken);
}

const checkInvalidTokenInfo = (accessToken) => {
  return invalidTokensMap.has(accessToken);
}

const getInvalidTokenInfo = () => invalidTokensMap;

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  isAuthenticated: validateRequest,
  setInvalidTokenInfo,
  checkInvalidTokenInfo,
  getInvalidTokenInfo
};