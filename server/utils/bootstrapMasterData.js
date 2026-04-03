const Department = require('../models/Department');
const Category = require('../models/Category');

const defaultDepartments = [
  { name: 'Water Supply', description: 'Water supply and drainage department', contactEmail: 'water@gmccp.gov.in', contactPerson: 'Mr. Patel' },
  { name: 'Roads & Infrastructure', description: 'Road maintenance and construction', contactEmail: 'roads@gmccp.gov.in', contactPerson: 'Mr. Shah' },
  { name: 'Sanitation', description: 'Waste management and cleanliness', contactEmail: 'sanitation@gmccp.gov.in', contactPerson: 'Mr. Desai' },
  { name: 'Electricity', description: 'Street lights and electrical infrastructure', contactEmail: 'electricity@gmccp.gov.in', contactPerson: 'Mr. Mehta' },
  { name: 'Health', description: 'Public health and hospitals', contactEmail: 'health@gmccp.gov.in', contactPerson: 'Dr. Joshi' },
  { name: 'Parks & Gardens', description: 'Public parks and green spaces', contactEmail: 'parks@gmccp.gov.in', contactPerson: 'Mr. Trivedi' },
  { name: 'Building & Town Planning', description: 'Building permits and town planning', contactEmail: 'building@gmccp.gov.in', contactPerson: 'Mr. Raval' },
];

const defaultCategories = [
  { name: 'Water Supply Issue', description: 'Problems related to water supply, leakage, contamination', departmentName: 'Water Supply' },
  { name: 'Drainage/Sewage', description: 'Blocked drains, sewage overflow', departmentName: 'Water Supply' },
  { name: 'Road Damage', description: 'Potholes, broken roads, damaged footpaths', departmentName: 'Roads & Infrastructure' },
  { name: 'Garbage Collection', description: 'Irregular garbage collection, waste dumping', departmentName: 'Sanitation' },
  { name: 'Street Light', description: 'Non-functional street lights, damaged poles', departmentName: 'Electricity' },
  { name: 'Noise Pollution', description: 'Excessive noise from construction, events', departmentName: 'Electricity' },
  { name: 'Public Health', description: 'Health hazards, mosquito breeding, stray animals', departmentName: 'Health' },
  { name: 'Park Maintenance', description: 'Damaged park equipment, overgrown vegetation', departmentName: 'Parks & Gardens' },
  { name: 'Illegal Construction', description: 'Unauthorized construction, encroachment', departmentName: 'Building & Town Planning' },
  { name: 'Other', description: 'Any other municipal complaint', departmentName: 'Sanitation' },
];

const bootstrapMasterData = async () => {
  const existingCategoryCount = await Category.countDocuments();
  const existingDepartmentCount = await Department.countDocuments();

  if (existingCategoryCount > 0 && existingDepartmentCount > 0) {
    return;
  }

  const departmentMap = new Map();

  for (const department of defaultDepartments) {
    let doc = await Department.findOne({ name: department.name });
    if (!doc) {
      doc = await Department.create(department);
    }
    departmentMap.set(department.name, doc._id);
  }

  for (const category of defaultCategories) {
    const existing = await Category.findOne({ name: category.name });
    if (existing) {
      continue;
    }

    await Category.create({
      name: category.name,
      description: category.description,
      department: departmentMap.get(category.departmentName),
    });
  }

  console.log('Default departments and categories ensured');
};

module.exports = bootstrapMasterData;
