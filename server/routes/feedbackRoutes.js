const express = require('express');
const { body } = require('express-validator');
const { createFeedback, getAllFeedbacks, getMyFeedbacks, deleteFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// @route   GET /api/feedback (Public)
router.get('/', getAllFeedbacks);

// @route   GET /api/feedback/my (Any logged-in user)
router.get('/my', protect, getMyFeedbacks);

// @route   POST /api/feedback (Any logged-in user)
router.post(
  '/',
  protect,
  [
    body('rating').isNumeric().withMessage('Rating is required').toInt().custom((value) => {
      if (value < 1 || value > 5) throw new Error('Rating must be between 1 and 5');
      return true;
    }),
    body('comment').optional().trim().isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters'),
  ],
  createFeedback
);

// @route   DELETE /api/feedback/:id (Admin)
router.delete('/:id', protect, authorize('admin'), deleteFeedback);

module.exports = router;
