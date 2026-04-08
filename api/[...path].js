try {
  require('../server/node_modules/dotenv').config({ path: './server/.env' });
} catch (error) {
  // Vercel injects environment variables, so local dotenv loading is optional here.
}

const connectDB = require('../server/config/db');
const app = require('../server/app');

let connectPromise;

module.exports = async (req, res) => {
  if (!connectPromise) {
    connectPromise = connectDB();
  }

  await connectPromise;
  return app(req, res);
};
