const express = require('express');
const auth = require('../config/auth');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/', auth.isAuthenticated, UserController.getUsers);

module.exports = router;