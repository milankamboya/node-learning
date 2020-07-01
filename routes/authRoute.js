const express = require('express');
const AuthController = require('../controllers/AuthController');
const auth = require('../config/auth');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', auth.isAuthenticated, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;