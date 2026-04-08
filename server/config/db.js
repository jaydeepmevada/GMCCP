const mongoose = require('mongoose');
const bootstrapMasterData = require('../utils/bootstrapMasterData');

let isBootstrapped = false;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    if (mongoose.connection.readyState === 1) {
      if (!isBootstrapped) {
        await bootstrapMasterData();
        isBootstrapped = true;
      }
      return mongoose.connection;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (!isBootstrapped) {
      await bootstrapMasterData();
      isBootstrapped = true;
    }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
