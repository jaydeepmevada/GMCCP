const { validationResult } = require('express-validator');
const HelpSupport = require('../models/HelpSupport');

// @desc    Submit support query
// @route   POST /api/support
// @access  Citizen
const createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { subject, message } = req.body;

    const ticket = await HelpSupport.create({
      user: req.user._id,
      subject,
      message,
    });

    res.status(201).json({ message: 'Support ticket created successfully', ticket });
  } catch (error) {
    console.error('CreateTicket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's support tickets
// @route   GET /api/support
// @access  Citizen
const getMyTickets = async (req, res) => {
  try {
    const tickets = await HelpSupport.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ tickets });
  } catch (error) {
    console.error('GetMyTickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all support tickets
// @route   GET /api/support/all
// @access  Admin
const getAllTickets = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const total = await HelpSupport.countDocuments(filter);
    const tickets = await HelpSupport.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      tickets,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GetAllTickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Respond to support ticket
// @route   PUT /api/support/:id
// @access  Admin
const respondToTicket = async (req, res) => {
  try {
    const { response, status } = req.body;

    const ticket = await HelpSupport.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (response) ticket.response = response;
    if (status) ticket.status = status;
    else if (response) ticket.status = 'Responded';

    await ticket.save();
    res.json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    console.error('RespondToTicket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTicket, getMyTickets, getAllTickets, respondToTicket };
