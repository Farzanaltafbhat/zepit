const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User'); // Ensure this path is correct
// Register user route
router.post('/register', userController.registerUser); 
// Login user route
router.post('/login', userController.loginUser); 
// Request upgrade route
router.post('/api/request-upgrade', authMiddleware, userController.requestUpgrade);// Get user by ID route
router.get('/users/:id', userController.getUser);
router.get('/api/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error); // Log the error for debugging
      res.status(500).send('Server error');
    }
  });
module.exports = router;
