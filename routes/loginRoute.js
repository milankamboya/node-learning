const express = require('express');
const bcrypt = require('bcryptjs');
const UserMaster = require('../models/user');

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

module.exports = router;