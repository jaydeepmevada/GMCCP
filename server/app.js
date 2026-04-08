const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

// CORS
app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

// Static folder for uploads (local development fallback)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/officer', require('./routes/officerRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GMCCP API is running', timestamp: new Date().toISOString() });
});

// Public stats (for home page)
app.get('/api/public/stats', async (req, res) => {
  try {
    const Complaint = require('./models/Complaint');
    const User = require('./models/User');
    const [totalComplaints, resolved, inProgress, totalUsers] = await Promise.all([
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: { $in: ['Resolved', 'Closed'] } }),
      Complaint.countDocuments({ status: 'In Progress' }),
      User.countDocuments({ role: 'citizen' }),
    ]);
    res.json({ totalComplaints, resolved, inProgress, totalUsers });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

module.exports = app;
