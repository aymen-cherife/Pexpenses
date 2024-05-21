const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// Route for registering a new user
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

module.exports = router;
