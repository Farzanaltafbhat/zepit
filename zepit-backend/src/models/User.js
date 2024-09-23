const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    upgradeRequested: { type: Boolean, default: false }, // Field for upgrade requests
    role: { type: String, enum: ['user', 'shopkeeper'], default: 'user' } // Add this line
});

module.exports = mongoose.model('User', userSchema);
