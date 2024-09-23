const User = require('../models/User'); // Only this line should exist
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token });
};

// Request upgrade
exports.requestUpgrade = async (req, res) => {
  console.log(req.user); // Log req.user to debug
    const userId = req.user.id; // Assuming you've set user ID in middleware
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.upgradeRequested = true; // Add a property or similar
        await user.save();

        res.status(200).json({ message: 'Upgrade request submitted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get user by ID
exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching user' });
    }
};
