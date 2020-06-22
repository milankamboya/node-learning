const express = require('express');
const homeRouter = require('./homeRoute');
const userRouter = require('./usersRoute');

const router = express.Router();

router.use('/', homeRouter);
router.use('/users', userRouter);

module.exports = router;