const express = require('express');
const {
  getStats,
  getAllComplaints,
  getComplaintById,
  assignComplaint,
  updateComplaintStatus,
  getAllUsers,
  updateUser,
  deactivateUser,
  generateReport,
  getReports,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, authorize('admin'));

// @route   GET /api/admin/stats
router.get('/stats', getStats);

// @route   GET /api/admin/complaints
router.get('/complaints', getAllComplaints);

// @route   GET /api/admin/complaints/:id
router.get('/complaints/:id', getComplaintById);

// @route   PATCH /api/admin/complaints/:id/assign
router.patch('/complaints/:id/assign', assignComplaint);

// @route   PATCH /api/admin/complaints/:id/status
router.patch('/complaints/:id/status', updateComplaintStatus);

// @route   GET /api/admin/users
router.get('/users', getAllUsers);

// @route   PUT /api/admin/users/:id
router.put('/users/:id', updateUser);

// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', deactivateUser);

// @route   POST /api/admin/reports/generate
router.post('/reports/generate', generateReport);

// @route   GET /api/admin/reports
router.get('/reports', getReports);

module.exports = router;
