const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserMaster = require('../models/user');
const auth = require('../config/auth');
const validate = require('../config/validations');

class AuthController {

  static register = async (req, res) => {

    const { error } = validate.validateResitration(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { name, email, password } = req.body;

    const tempUser = await UserMaster.findOne({ email });
    if (tempUser) {
      return res.json('user already exists');
    }

    const hashPass = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

    const User = new UserMaster({ name, email, password: hashPass });
    let newUser = await User.save();
    return res.json({ _id: newUser._id, name: newUser.name, email: newUser.email, date: newUser.date, role: newUser.role });
  };

  static login = async (req, res) => {
    const { error } = validate.validateLogin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;
    const user = await UserMaster.findOne({ email });
    if (!user) {
      return res.status(400).json('invalid credentials!!!');
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      try {
        const accessToken = auth.generateAccessToken(user);
        const refreshToken = auth.generateRefreshToken(user);
        return res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(400).json('invalid credentials!!!');
    }

  };

  static logout = async (req, res) => {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader.split(' ')[1];
    const refreshToken = req.headers['refresh-token'];
    auth.setInvalidTokenInfo(token, refreshToken);
    return res.status(200).json('Successfully logged out!!!');
  };

  static refreshToken = (req, res) => {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader.split(' ')[1];
    const refreshToken = req.headers['refresh-token'];

    if (auth.checkInvalidTokenInfo(token)) {
      return res.status(404).send('Token Invalid');
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).send(err);
      }
      const { email } = decoded;
      const user = await UserMaster.findOne({ email });
      if (!user) {
        return res.status(400).json('User does not found associated with refresh token!!!');
      }

      try {
        const accessToken = auth.generateAccessToken(user);
        const refreshToken = auth.generateRefreshToken(user);
        return res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  }
}

module.exports = AuthController