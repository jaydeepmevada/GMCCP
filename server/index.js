const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`GMCCP Server running on port ${PORT}`);
      console.log(`API: http://localhost:${PORT}/api/health`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
