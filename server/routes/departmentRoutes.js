const express = require('express');
const { body } = require('express-validator');
const { getDepartments, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// @route   GET /api/departments (Protected)
router.get('/', protect, getDepartments);

// @route   POST /api/departments (Admin)
router.post(
  '/',
  protect,
  authorize('admin'),
  [body('name').trim().notEmpty().withMessage('Department name is required')],
  createDepartment
);

// @route   PUT /api/departments/:id (Admin)
router.put('/:id', protect, authorize('admin'), updateDepartment);

// @route   DELETE /api/departments/:id (Admin)
router.delete('/:id', protect, authorize('admin'), deleteDepartment);

module.exports = router;
