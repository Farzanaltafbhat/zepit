const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Admin: Approve upgrade to shopkeeper
router.post('/approve-upgrade/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user || !user.upgradeRequested) {
        return res.status(404).send('User not found or not eligible for upgrade');
      }
  
      user.role = 'shopkeeper'; // Upgrade to shopkeeper
      user.upgradeRequested = false; // Clear the upgrade request flag
      await user.save();
      
      res.status(200).send('User upgrade request approved.');
    } catch (error) {
      console.error('Error approving upgrade:', error);
      res.status(500).send('Server error');
    }
  });
  
router.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Server error');
    }
  });
module.exports = router;
