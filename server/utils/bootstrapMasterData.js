const Department = require('../models/Department');
const Category = require('../models/Category');
const User = require('../models/User');

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

const defaultOfficers = [
  { name: 'Rajesh Patel', email: 'water.officer@gmccp.gov.in', password: 'officer123', phone: '9876543211', role: 'officer', departmentName: 'Water Supply' },
  { name: 'Amit Shah', email: 'roads.officer@gmccp.gov.in', password: 'officer123', phone: '9876543212', role: 'officer', departmentName: 'Roads & Infrastructure' },
  { name: 'Priya Desai', email: 'sanitation.officer@gmccp.gov.in', password: 'officer123', phone: '9876543213', role: 'officer', departmentName: 'Sanitation' },
  { name: 'Vikram Mehta', email: 'electricity.officer@gmccp.gov.in', password: 'officer123', phone: '9876543214', role: 'officer', departmentName: 'Electricity' },
  { name: 'Dr. Suresh Joshi', email: 'health.officer@gmccp.gov.in', password: 'officer123', phone: '9876543215', role: 'officer', departmentName: 'Health' },
  { name: 'Kiran Trivedi', email: 'parks.officer@gmccp.gov.in', password: 'officer123', phone: '9876543216', role: 'officer', departmentName: 'Parks & Gardens' },
  { name: 'Nitin Raval', email: 'building.officer@gmccp.gov.in', password: 'officer123', phone: '9876543217', role: 'officer', departmentName: 'Building & Town Planning' },
];

const defaultAdmins = [
  {
    name: 'Admin Jaydeep',
    email: 'jaydeepadmin@gmccp.gov.in',
    password: 'jaydeep@admin1',
    phone: '8160279471',
    role: 'admin',
  },
  {
    name: 'Admin Prakash',
    email: 'prakashadmin@gmccp.gov.in',
    password: 'prakash@admin2',
    phone: '8160279472',
    role: 'admin',
  },
  {
    name: 'Admin Jayesh',
    email: 'jayeshadmin@gmccp.gov.in',
    password: 'jayesh@admin3',
    phone: '8160279473',
    role: 'admin',
  },
];

const bootstrapMasterData = async () => {
  const existingCategoryCount = await Category.countDocuments();
  const existingDepartmentCount = await Department.countDocuments();
  const existingAdminCount = await User.countDocuments({ role: 'admin' });

  if (existingCategoryCount > 0 && existingDepartmentCount > 0 && existingAdminCount > 0) {
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

  let createdAdminCount = 0;
  if (existingAdminCount < defaultAdmins.length) {
    for (const admin of defaultAdmins) {
      const existingAdmin = await User.findOne({ email: admin.email });
      if (!existingAdmin) {
        await User.create(admin);
        createdAdminCount++;
      }
    }
  }

  let createdOfficerCount = 0;
  for (const officer of defaultOfficers) {
    const existingOfficer = await User.findOne({ email: officer.email });
    if (!existingOfficer) {
      await User.create({
        name: officer.name,
        email: officer.email,
        password: officer.password,
        phone: officer.phone,
        role: officer.role,
        department: departmentMap.get(officer.departmentName),
      });
      createdOfficerCount++;
    }
  }

  const summaryParts = ['Default departments and categories ensured'];
  if (createdAdminCount > 0) summaryParts.push(`${createdAdminCount} admin user(s) ensured`);
  if (createdOfficerCount > 0) summaryParts.push(`${createdOfficerCount} officer user(s) ensured`);

  console.log(summaryParts.join(', '));
};

module.exports = bootstrapMasterData;
