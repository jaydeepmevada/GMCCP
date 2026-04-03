const express = require('express');
const { body } = require('express-validator');
const { createTicket, getMyTickets, getAllTickets, respondToTicket } = require('../controllers/supportController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// @route   GET /api/support (Citizen - own tickets)
router.get('/', protect, authorize('citizen'), getMyTickets);

// @route   GET /api/support/all (Admin - all tickets)
router.get('/all', protect, authorize('admin'), getAllTickets);

// @route   POST /api/support (Citizen)
router.post(
  '/',
  protect,
  authorize('citizen'),
  [
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  createTicket
);

// @route   PUT /api/support/:id (Admin - respond)
router.put('/:id', protect, authorize('admin'), respondToTicket);

module.exports = router;
