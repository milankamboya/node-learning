const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [{ name: 'Guru', age: '27' }, { name: 'Backy', age: '27' }];
  res.json(users);
});

module.exports = router;