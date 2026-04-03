const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Category = require('../models/Category');
const Department = require('../models/Department');
const Feedback = require('../models/Feedback');
const HelpSupport = require('../models/HelpSupport');
const Report = require('../models/Report');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
const getStats = async (req, res) => {
  try {
    const [
      totalComplaints,
      newComplaints,
      inProgressComplaints,
      resolvedComplaints,
      closedComplaints,
      totalUsers,
      totalOfficers,
      totalCategories,
      totalDepartments,
    ] = await Promise.all([
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: 'New' }),
      Complaint.countDocuments({ status: 'In Progress' }),
      Complaint.countDocuments({ status: 'Resolved' }),
      Complaint.countDocuments({ status: 'Closed' }),
      User.countDocuments({ role: 'citizen' }),
      User.countDocuments({ role: 'officer' }),
      Category.countDocuments({ isActive: true }),
      Department.countDocuments({ isActive: true }),
    ]);

    res.json({
      stats: {
        totalComplaints,
        newComplaints,
        inProgressComplaints,
        resolvedComplaints,
        closedComplaints,
        totalUsers,
        totalOfficers,
        totalCategories,
        totalDepartments,
      },
    });
  } catch (error) {
    console.error('GetStats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all complaints (with filters)
// @route   GET /api/admin/complaints
// @access  Admin
const getAllComplaints = async (req, res) => {
  try {
    const { status, city, category, priority, page = 1, limit = 10, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { complaintId: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Complaint.countDocuments(filter);
    const complaints = await Complaint.find(filter)
      .populate('user', 'name email')
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
    console.error('GetAllComplaints error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single complaint by ID
// @route   GET /api/admin/complaints/:id
// @access  Admin
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('category', 'name')
      .populate('department', 'name')
      .populate('assignedTo', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ complaint });
  } catch (error) {
    console.error('GetComplaintById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Assign complaint to officer/department
// @route   PATCH /api/admin/complaints/:id/assign
// @access  Admin
const assignComplaint = async (req, res) => {
  try {
    const { assignedTo, department } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (assignedTo) complaint.assignedTo = assignedTo;
    if (department) complaint.department = department;
    if (complaint.status === 'New') complaint.status = 'In Progress';

    await complaint.save();
    await complaint.populate('assignedTo', 'name email');
    await complaint.populate('department', 'name');

    res.json({ message: 'Complaint assigned successfully', complaint });
  } catch (error) {
    console.error('AssignComplaint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update complaint status (admin)
// @route   PATCH /api/admin/complaints/:id/status
// @access  Admin
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'In Progress', 'Verified', 'Resolved', 'Closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    if (status === 'Resolved') complaint.resolvedAt = new Date();

    await complaint.save();
    res.json({ message: 'Status updated successfully', complaint });
  } catch (error) {
    console.error('UpdateComplaintStatus error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .populate('department', 'name')
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GetAllUsers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user (role, status, department)
// @route   PUT /api/admin/users/:id
// @access  Admin
const updateUser = async (req, res) => {
  try {
    const { role, isActive, department } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (department !== undefined) user.department = department;

    await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        department: user.department,
      },
    });
  } catch (error) {
    console.error('UpdateUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Deactivate user
// @route   DELETE /api/admin/users/:id
// @access  Admin
const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = false;
    await user.save();
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('DeactivateUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Generate and save report
// @route   POST /api/admin/reports/generate
// @access  Admin
const generateReport = async (req, res) => {
  try {
    const { type } = req.body;
    const validTypes = ['complaints', 'department', 'status', 'city', 'priority'];

    if (!type || !validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid report type. Valid types: ' + validTypes.join(', ') });
    }

    let data = {};
    const complaints = await Complaint.find()
      .populate('category', 'name')
      .populate('department', 'name')
      .populate('user', 'name email')
      .populate('assignedTo', 'name');

    if (type === 'complaints') {
      data = {
        totalComplaints: complaints.length,
        newComplaints: complaints.filter(c => c.status === 'New').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
        closed: complaints.filter(c => c.status === 'Closed').length,
        complaints: complaints.map(c => ({
          complaintId: c.complaintId,
          title: c.title,
          status: c.status,
          priority: c.priority,
          city: c.city,
          category: c.category?.name,
          user: c.user?.name,
          createdAt: c.createdAt,
        })),
      };
    } else if (type === 'department') {
      const deptStats = {};
      complaints.forEach(c => {
        const dept = c.department?.name || 'Unassigned';
        if (!deptStats[dept]) deptStats[dept] = { total: 0, resolved: 0, pending: 0 };
        deptStats[dept].total++;
        if (c.status === 'Resolved' || c.status === 'Closed') deptStats[dept].resolved++;
        else deptStats[dept].pending++;
      });
      data = { departmentWise: deptStats };
    } else if (type === 'status') {
      const statusStats = {};
      complaints.forEach(c => {
        statusStats[c.status] = (statusStats[c.status] || 0) + 1;
      });
      data = { statusWise: statusStats, total: complaints.length };
    } else if (type === 'city') {
      const cityStats = {};
      complaints.forEach(c => {
        cityStats[c.city] = (cityStats[c.city] || 0) + 1;
      });
      data = { cityWise: cityStats, total: complaints.length };
    } else if (type === 'priority') {
      const priorityStats = {};
      complaints.forEach(c => {
        priorityStats[c.priority] = (priorityStats[c.priority] || 0) + 1;
      });
      data = { priorityWise: priorityStats, total: complaints.length };
    }

    const report = await Report.create({
      generatedBy: req.user._id,
      type,
      filters: req.body.filters || {},
      data,
    });

    res.status(201).json({ message: 'Report generated successfully', report });
  } catch (error) {
    console.error('GenerateReport error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all saved reports
// @route   GET /api/admin/reports
// @access  Admin
const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('generatedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({ reports });
  } catch (error) {
    console.error('GetReports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
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
};
