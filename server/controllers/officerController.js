const Complaint = require('../models/Complaint');

// @desc    Get assigned complaints for officer
// @route   GET /api/officer/complaints
// @access  Officer
const getAssignedComplaints = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    // Officer can only see complaints assigned to them AND in their department
    const filter = { assignedTo: req.user._id };
    if (req.user.department) {
      filter.department = req.user.department;
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const total = await Complaint.countDocuments(filter);
    const complaints = await Complaint.find(filter)
      .populate('user', 'name email phone')
      .populate('category', 'name')
      .populate('department', 'name')
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
    console.error('GetAssignedComplaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single complaint detail
// @route   GET /api/officer/complaints/:id
// @access  Officer
const getComplaintDetail = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    })
      .populate('user', 'name email phone address city')
      .populate('category', 'name')
      .populate('department', 'name');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not assigned to you' });
    }

    res.json({ complaint });
  } catch (error) {
    console.error('GetComplaintDetail error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update complaint status
// @route   PATCH /api/officer/complaints/:id/status
// @access  Officer
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['In Progress', 'Verified', 'Resolved', 'Closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Allowed: In Progress, Verified, Resolved, Closed' });
    }

    const complaint = await Complaint.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not assigned to you' });
    }

    complaint.status = status;
    if (status === 'Resolved') complaint.resolvedAt = new Date();

    await complaint.save();
    res.json({ message: 'Status updated successfully', complaint });
  } catch (error) {
    console.error('UpdateStatus error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Resolve complaint with remarks
// @route   PATCH /api/officer/complaints/:id/resolve
// @access  Officer
const resolveComplaint = async (req, res) => {
  try {
    const { remarks } = req.body;

    const complaint = await Complaint.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not assigned to you' });
    }

    complaint.status = 'Resolved';
    complaint.remarks = remarks || '';
    complaint.resolvedAt = new Date();

    await complaint.save();
    res.json({ message: 'Complaint resolved successfully', complaint });
  } catch (error) {
    console.error('ResolveComplaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Set/change priority
// @route   PATCH /api/officer/complaints/:id/priority
// @access  Officer
const setPriority = async (req, res) => {
  try {
    const { priority } = req.body;
    const validPriorities = ['Low', 'Medium', 'High', 'Urgent'];

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    const complaint = await Complaint.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not assigned to you' });
    }

    complaint.priority = priority;
    await complaint.save();
    res.json({ message: 'Priority updated successfully', complaint });
  } catch (error) {
    console.error('SetPriority error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Close complaint
// @route   PATCH /api/officer/complaints/:id/close
// @access  Officer
const closeComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or not assigned to you' });
    }

    if (complaint.status !== 'Resolved') {
      return res.status(400).json({ message: 'Complaint must be resolved before closing' });
    }

    complaint.status = 'Closed';
    await complaint.save();
    res.json({ message: 'Complaint closed successfully', complaint });
  } catch (error) {
    console.error('CloseComplaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get officer stats
// @route   GET /api/officer/stats
// @access  Officer
const getOfficerStats = async (req, res) => {
  try {
    const officerId = req.user._id;
    const [total, inProgress, resolved, closed] = await Promise.all([
      Complaint.countDocuments({ assignedTo: officerId }),
      Complaint.countDocuments({ assignedTo: officerId, status: 'In Progress' }),
      Complaint.countDocuments({ assignedTo: officerId, status: 'Resolved' }),
      Complaint.countDocuments({ assignedTo: officerId, status: 'Closed' }),
    ]);

    res.json({
      stats: { total, inProgress, resolved, closed },
    });
  } catch (error) {
    console.error('GetOfficerStats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAssignedComplaints,
  getComplaintDetail,
  updateStatus,
  resolveComplaint,
  setPriority,
  closeComplaint,
  getOfficerStats,
};
