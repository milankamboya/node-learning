const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserMaster = require('../models/user');
const auth = require('../config/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const tempUser = await UserMaster.findOne({ email });
  if (tempUser) {
    return res.json('user already exists');
  }

  const hashPass = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

  const User = new UserMaster({ name, email, password: hashPass });
  let newUser = await User.save();
  return res.json({ _id: newUser._id, name: newUser.name, email: newUser.email, date: newUser.date, role: newUser.role });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserMaster.findOne({ email });
  if (!user) {
    return res.status(400).json('invalid credentials!!!');
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (isValid) {
    const accessToken = auth.generateAccessToken(user);
    const refreshToken = auth.generateRefreshToken(user);
    return res.status(200).json({ access_token: accessToken, refresh_token: refreshToken });
  } else {
    return res.status(400).json('invalid credentials!!!');
  }

});

module.exports = router;