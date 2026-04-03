const { validationResult } = require('express-validator');
const Department = require('../models/Department');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Protected
const getDepartments = async (req, res) => {
  try {
    const filter = req.query.active === 'true' ? { isActive: true } : {};
    const departments = await Department.find(filter).sort({ name: 1 });
    res.json({ departments });
  } catch (error) {
    console.error('GetDepartments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a department
// @route   POST /api/departments
// @access  Admin
const createDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, description, contactEmail, contactPerson } = req.body;

    const existing = await Department.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ message: 'Department with this name already exists' });
    }

    const department = await Department.create({ name, description, contactEmail, contactPerson });
    res.status(201).json({ message: 'Department created successfully', department });
  } catch (error) {
    console.error('CreateDepartment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a department
// @route   PUT /api/departments/:id
// @access  Admin
const updateDepartment = async (req, res) => {
  try {
    const { name, description, contactEmail, contactPerson, isActive } = req.body;

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    if (name) department.name = name;
    if (description !== undefined) department.description = description;
    if (contactEmail !== undefined) department.contactEmail = contactEmail;
    if (contactPerson !== undefined) department.contactPerson = contactPerson;
    if (isActive !== undefined) department.isActive = isActive;

    await department.save();
    res.json({ message: 'Department updated successfully', department });
  } catch (error) {
    console.error('UpdateDepartment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete (deactivate) a department
// @route   DELETE /api/departments/:id
// @access  Admin
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    department.isActive = false;
    await department.save();
    res.json({ message: 'Department deactivated successfully' });
  } catch (error) {
    console.error('DeleteDepartment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDepartments, createDepartment, updateDepartment, deleteDepartment };
