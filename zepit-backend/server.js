const express = require('express');
const connectDB = require('./src/config/db'); // Adjust path as needed
const { auth } = require('express-openid-connect');
require('dotenv').config();
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes'); // Import product routes
const orderRoutes = require('./src/routes/orderRoutes'); // Add this line
const userRoutes = require('./src/routes/userRoutes'); // Adjust path as needed
const cookieParser = require('cookie-parser');
const adminRoutes = require('./src/routes/adminRoutes'); // Ensure this path is correct

// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());
// Connect to MongoDB Atlas
connectDB();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

// Auth middleware
app.use(auth(config));

// Home route
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Profile route
app.get('/profile', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(`Hello, ${req.oidc.user.name}`);
    } else {
        res.status(403).send('Access denied');
    }
});

// Use product routes
app.use(productRoutes);
// Use order routes
app.use(orderRoutes);
app.use('/', userRoutes); // Make sure this matches the path used in your routes
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
