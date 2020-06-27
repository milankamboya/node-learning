const express = require('express');
const auth = require('../config/auth');
const homeRouter = require('./homeRoute');
const userRouter = require('./usersRoute');
const loginRouter = require('./loginRoute');

const router = express.Router();

router.use('/users', auth.isAuthenticated, userRouter);
router.use('/auth', loginRouter);
router.use('/', auth.isAuthenticated, homeRouter);

module.exports = router;