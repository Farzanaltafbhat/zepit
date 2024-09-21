const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register user route
router.post('/api/register', userController.registerUser); // Keep this as /api/register
// Login user route
router.post('/api/login', userController.loginUser); // Also keep this as /api/login

// Get user by ID route
router.get('/api/users/:id', userController.getUser); // Ensure this points to the correct function

module.exports = router;
