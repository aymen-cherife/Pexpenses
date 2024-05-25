const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// Route for registering a new user
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route to request a password reset token
router.post('/reset_password',authController.reset_password_token);

// Route to display the password reset form
router.get('/reset_password_form/:token', authController.reset_password_form);

// Route to update with the new password
router.get('/set_new_password/:token', authController.reset_password);

module.exports = router;
