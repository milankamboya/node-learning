const express = require('express');
const UserMaster = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const tempUser = await UserMaster.findOne({ email });
  if (tempUser) {
    return res.json('user already exists');
  }

  const User = new UserMaster({ name, email, password });
  let newUser = await User.save();
  return res.json({ _id: newUser._id, name: newUser.name, email: newUser.email, date: newUser.date, role: newUser.role });
});

module.exports = router;