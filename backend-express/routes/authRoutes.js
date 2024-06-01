const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// Route for registering a new user
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route to request a password reset token
router.post('/reset_password',authController.reset_password_token);

//Route to update with the new password
router.post('/reset_password/:token', authController.reset_password);

module.exports = router;
