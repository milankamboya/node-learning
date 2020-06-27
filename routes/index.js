const express = require('express');
const auth = require('../config/auth');
const homeRouter = require('./homeRoute');
const userRouter = require('./usersRoute');
const loginRouter = require('./loginRoute');

const router = express.Router();

router.use('/', auth.isAuthenticated, homeRouter);
router.use('/users', auth.isAuthenticated, userRouter);
router.use('/', loginRouter);

module.exports = router;