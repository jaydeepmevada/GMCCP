const { validationResult } = require('express-validator');
const Feedback = require('../models/Feedback');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Citizen
const createFeedback = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { rating, comment, complaint } = req.body;

    const feedback = await Feedback.create({
      user: req.user._id,
      rating,
      comment,
      complaint: complaint || undefined,
    });

    await feedback.populate('user', 'name');

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('CreateFeedback error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all feedbacks (public)
// @route   GET /api/feedback
// @access  Public
const getAllFeedbacks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const total = await Feedback.countDocuments();
    const feedbacks = await Feedback.find()
      .populate('user', 'name')
      .populate('complaint', 'complaintId title')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      feedbacks,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GetAllFeedbacks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's own feedbacks
// @route   GET /api/feedback/my
// @access  Citizen
const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id })
      .populate('complaint', 'complaintId title')
      .sort({ createdAt: -1 });

    res.json({ feedbacks });
  } catch (error) {
    console.error('GetMyFeedbacks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Admin
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('DeleteFeedback error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createFeedback, getAllFeedbacks, getMyFeedbacks, deleteFeedback };
