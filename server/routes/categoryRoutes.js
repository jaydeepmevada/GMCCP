const express = require('express');
const { body } = require('express-validator');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// @route   GET /api/categories (Public)
router.get('/', getCategories);

// @route   POST /api/categories (Admin)
router.post(
  '/',
  protect,
  authorize('admin'),
  [body('name').trim().notEmpty().withMessage('Category name is required')],
  createCategory
);

// @route   PUT /api/categories/:id (Admin)
router.put('/:id', protect, authorize('admin'), updateCategory);

// @route   DELETE /api/categories/:id (Admin)
router.delete('/:id', protect, authorize('admin'), deleteCategory);

module.exports = router;
