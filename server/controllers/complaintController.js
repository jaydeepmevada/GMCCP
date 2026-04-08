const { validationResult } = require('express-validator');
const Complaint = require('../models/Complaint');
const Category = require('../models/Category');
const User = require('../models/User');
const { cloudinary, hasCloudinaryConfig } = require('../config/cloudinary');

const uploadImage = async (file) => {
  if (!file) return '';

  if (file.path) {
    return `/uploads/${file.filename}`;
  }

  if (!hasCloudinaryConfig || !file.buffer) {
    return '';
  }

  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'gmccp/complaints',
    resource_type: 'image',
  });

  return result.secure_url;
};

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Citizen
const createComplaint = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, description, category, city, state, address } = req.body;

    const imageUrl = await uploadImage(req.file);

    // Auto-assign department and officer based on category
    let departmentId = null;
    let assignedOfficerId = null;

    const categoryDoc = await Category.findById(category).populate('department');
    if (categoryDoc && categoryDoc.department) {
      departmentId = categoryDoc.department._id;

      // Find an active officer assigned to this department
      const officer = await User.findOne({
        role: 'officer',
        department: departmentId,
        isActive: true,
      });

      if (officer) {
        assignedOfficerId = officer._id;
      }
    }

    const complaintData = {
      user: req.user._id,
      title,
      description,
      category,
      city,
      state: state || 'Gujarat',
      address,
      imageUrl,
    };

    if (departmentId) complaintData.department = departmentId;
    if (assignedOfficerId) {
      complaintData.assignedTo = assignedOfficerId;
      complaintData.status = 'In Progress';
    }

    const complaint = await Complaint.create(complaintData);

    await complaint.populate('category', 'name');
    await complaint.populate('department', 'name');
    await complaint.populate('assignedTo', 'name');

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint,
    });
  } catch (error) {
    console.error('CreateComplaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged-in user's complaints
// @route   GET /api/complaints
// @access  Citizen
const getMyComplaints = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { user: req.user._id };

    if (status) filter.status = status;

    const total = await Complaint.countDocuments(filter);
    const complaints = await Complaint.find(filter)
      .populate('category', 'name')
      .populate('department', 'name')
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      complaints,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GetMyComplaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single complaint detail
// @route   GET /api/complaints/:id
// @access  Citizen (own complaint)
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
      .populate('category', 'name')
      .populate('department', 'name')
      .populate('assignedTo', 'name email')
      .populate('user', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ complaint });
  } catch (error) {
    console.error('GetComplaintById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Track complaint by complaintId (public-ish)
// @route   GET /api/complaints/track/:complaintId
// @access  Protected
const trackComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      complaintId: req.params.complaintId,
    })
      .populate('category', 'name')
      .populate('department', 'name')
      .select('complaintId title status priority city category department createdAt updatedAt remarks resolvedAt');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found. Please check the complaint ID.' });
    }

    res.json({ complaint });
  } catch (error) {
    console.error('TrackComplaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createComplaint, getMyComplaints, getComplaintById, trackComplaint };
