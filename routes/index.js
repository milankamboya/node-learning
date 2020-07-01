const express = require('express');
const homeRouter = require('./homeRoute');
const userRouter = require('./usersRoute');
const authRouter = require('./authRoute');

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/', homeRouter);

module.exports = router;