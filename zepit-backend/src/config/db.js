const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected to Atlas');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
