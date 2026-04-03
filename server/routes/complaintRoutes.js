const express = require('express');
const { body } = require('express-validator');
const { createComplaint, getMyComplaints, getComplaintById, trackComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// @route   POST /api/complaints
router.post(
  '/',
  protect,
  authorize('citizen'),
  upload.single('image'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
  ],
  createComplaint
);

// @route   GET /api/complaints
router.get('/', protect, authorize('citizen'), getMyComplaints);

// @route   GET /api/complaints/track/:complaintId
router.get('/track/:complaintId', protect, trackComplaint);

// @route   GET /api/complaints/:id
router.get('/:id', protect, authorize('citizen'), getComplaintById);

module.exports = router;
