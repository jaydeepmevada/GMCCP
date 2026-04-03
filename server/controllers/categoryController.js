const { validationResult } = require('express-validator');
const Category = require('../models/Category');

// @desc    Get all active categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('department', 'name')
      .sort({ name: 1 });
    res.json({ categories });
  } catch (error) {
    console.error('GetCategories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Admin
const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, description, department } = req.body;

    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const categoryData = { name, description };
    if (department) categoryData.department = department;

    const category = await Category.create(categoryData);
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('CreateCategory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Admin
const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive, department } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;
    if (department !== undefined) category.department = department;

    await category.save();
    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('UpdateCategory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete (deactivate) a category
// @route   DELETE /api/categories/:id
// @access  Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.isActive = false;
    await category.save();
    res.json({ message: 'Category deactivated successfully' });
  } catch (error) {
    console.error('DeleteCategory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
