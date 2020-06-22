const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('homepage successfull');
})

module.exports = router;