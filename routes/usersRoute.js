const express = require('express');
const UserMaster = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await UserMaster.find();
  return res.json(users);
});

module.exports = router;