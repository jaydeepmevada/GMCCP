const express = require('express');
const {
  getAssignedComplaints,
  getComplaintDetail,
  updateStatus,
  resolveComplaint,
  setPriority,
  closeComplaint,
  getOfficerStats,
} = require('../controllers/officerController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// All officer routes require auth + officer role
router.use(protect, authorize('officer'));

// @route   GET /api/officer/stats
router.get('/stats', getOfficerStats);

// @route   GET /api/officer/complaints
router.get('/complaints', getAssignedComplaints);

// @route   GET /api/officer/complaints/:id
router.get('/complaints/:id', getComplaintDetail);

// @route   PATCH /api/officer/complaints/:id/status
router.patch('/complaints/:id/status', updateStatus);

// @route   PATCH /api/officer/complaints/:id/resolve
router.patch('/complaints/:id/resolve', resolveComplaint);

// @route   PATCH /api/officer/complaints/:id/priority
router.patch('/complaints/:id/priority', setPriority);

// @route   PATCH /api/officer/complaints/:id/close
router.patch('/complaints/:id/close', closeComplaint);

module.exports = router;
