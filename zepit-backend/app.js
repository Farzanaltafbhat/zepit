const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const productRoutes = require('./src/routes/productRoutes');
// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(productRoutes);
// Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes); // Correct route integration

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

module.exports = app;
