const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Department = require('./models/Department');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Department.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Departments
    const departments = await Department.insertMany([
      { name: 'Water Supply', description: 'Water supply and drainage department', contactEmail: 'water@gmccp.gov.in', contactPerson: 'Mr. Patel' },
      { name: 'Roads & Infrastructure', description: 'Road maintenance and construction', contactEmail: 'roads@gmccp.gov.in', contactPerson: 'Mr. Shah' },
      { name: 'Sanitation', description: 'Waste management and cleanliness', contactEmail: 'sanitation@gmccp.gov.in', contactPerson: 'Mr. Desai' },
      { name: 'Electricity', description: 'Street lights and electrical infrastructure', contactEmail: 'electricity@gmccp.gov.in', contactPerson: 'Mr. Mehta' },
      { name: 'Health', description: 'Public health and hospitals', contactEmail: 'health@gmccp.gov.in', contactPerson: 'Dr. Joshi' },
      { name: 'Parks & Gardens', description: 'Public parks and green spaces', contactEmail: 'parks@gmccp.gov.in', contactPerson: 'Mr. Trivedi' },
      { name: 'Building & Town Planning', description: 'Building permits and town planning', contactEmail: 'building@gmccp.gov.in', contactPerson: 'Mr. Raval' },
    ]);
    console.log(`✅ Created ${departments.length} departments`);

    // Create Categories (each linked to a department)
    const categories = await Category.insertMany([
      { name: 'Water Supply Issue', description: 'Problems related to water supply, leakage, contamination', department: departments[0]._id },
      { name: 'Drainage/Sewage', description: 'Blocked drains, sewage overflow', department: departments[0]._id },
      { name: 'Road Damage', description: 'Potholes, broken roads, damaged footpaths', department: departments[1]._id },
      { name: 'Garbage Collection', description: 'Irregular garbage collection, waste dumping', department: departments[2]._id },
      { name: 'Street Light', description: 'Non-functional street lights, damaged poles', department: departments[3]._id },
      { name: 'Noise Pollution', description: 'Excessive noise from construction, events', department: departments[3]._id },
      { name: 'Public Health', description: 'Health hazards, mosquito breeding, stray animals', department: departments[4]._id },
      { name: 'Park Maintenance', description: 'Damaged park equipment, overgrown vegetation', department: departments[5]._id },
      { name: 'Illegal Construction', description: 'Unauthorized construction, encroachment', department: departments[6]._id },
      { name: 'Other', description: 'Any other municipal complaint', department: departments[2]._id },
    ]);
    console.log(`✅ Created ${categories.length} categories`);

    // Create Admin Users (3 admins)
    const admin1 = await User.create({
      name: 'Admin Jaydeep',
      email: 'jaydeepadmin@gmccp.gov.in',
      password: 'jaydeep@admin1',
      phone: '8160279471',
      role: 'admin',
    });

    const admin2 = await User.create({
      name: 'Admin Prakash',
      email: 'prakashadmin@gmccp.gov.in',
      password: 'prakash@admin2',
      phone: '8160279472',
      role: 'admin',
    });

    const admin3 = await User.create({
      name: 'Admin Jayesh',
      email: 'jayeshadmin@gmccp.gov.in',
      password: 'jayesh@admin3',
      phone: '8160279473',
      role: 'admin',
    });
    console.log(`✅ Created 3 admin users: ${admin1.email}, ${admin2.email}, ${admin3.email}`);

    // Create Officer Users — one per department
    const officerData = [
      { name: 'Rajesh Patel', email: 'water.officer@gmccp.gov.in', password: 'officer123', phone: '9876543211', role: 'officer', department: departments[0]._id },
      { name: 'Amit Shah', email: 'roads.officer@gmccp.gov.in', password: 'officer123', phone: '9876543212', role: 'officer', department: departments[1]._id },
      { name: 'Priya Desai', email: 'sanitation.officer@gmccp.gov.in', password: 'officer123', phone: '9876543213', role: 'officer', department: departments[2]._id },
      { name: 'Vikram Mehta', email: 'electricity.officer@gmccp.gov.in', password: 'officer123', phone: '9876543214', role: 'officer', department: departments[3]._id },
      { name: 'Dr. Suresh Joshi', email: 'health.officer@gmccp.gov.in', password: 'officer123', phone: '9876543215', role: 'officer', department: departments[4]._id },
      { name: 'Kiran Trivedi', email: 'parks.officer@gmccp.gov.in', password: 'officer123', phone: '9876543216', role: 'officer', department: departments[5]._id },
      { name: 'Nitin Raval', email: 'building.officer@gmccp.gov.in', password: 'officer123', phone: '9876543217', role: 'officer', department: departments[6]._id },
    ];

    for (const data of officerData) {
      await User.create(data);
    }
    console.log(`✅ Created ${officerData.length} officer users`);

    // Create Citizen Users
    await User.create({
      name: 'Prakash Chauhan',
      email: 'citizen@gmail.com',
      password: 'citizen123',
      phone: '9876543220',
      role: 'citizen',
      city: 'Ahmedabad',
    });

    await User.create({
      name: 'Meera Joshi',
      email: 'meera@gmail.com',
      password: 'citizen123',
      phone: '9876543221',
      role: 'citizen',
      city: 'Surat',
    });
    console.log(`✅ Created 2 citizen users`);

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('========================================');
    console.log('         LOGIN CREDENTIALS');
    console.log('========================================');
    console.log('');
    console.log('--- ADMIN 1 (Jaydeep) ---');
    console.log('Email:    jaydeepadmin@gmccp.gov.in');
    console.log('Password: jaydeep@admin1');
    console.log('');
    console.log('--- ADMIN 2 (Prakash) ---');
    console.log('Email:    prakashadmin@gmccp.gov.in');
    console.log('Password: prakash@admin2');
    console.log('');
    console.log('--- ADMIN 3 (Jayesh) ---');
    console.log('Email:    jayeshadmin@gmccp.gov.in');
    console.log('Password: jayesh@admin3');
    console.log('');
    console.log('--- DEPARTMENT OFFICERS ---');
    console.log('');
    console.log('1. Water Supply Officer');
    console.log('   Email:    water.officer@gmccp.gov.in');
    console.log('   Password: officer123');
    console.log('   Categories: Water Supply Issue, Drainage/Sewage');
    console.log('');
    console.log('2. Roads & Infrastructure Officer');
    console.log('   Email:    roads.officer@gmccp.gov.in');
    console.log('   Password: officer123');
    console.log('   Categories: Road Damage');
    console.log('');
    console.log('3. Sanitation Officer');
    console.log('   Email:    sanitation.officer@gmccp.gov.in');
    console.log('   Password: officer123');
    console.log('   Categories: Garbage Collection, Other');
    console.log('');
    console.log('4. Electricity Officer');
    console.log('   Email:    electricity.officer@gmccp.gov.in');
    console.log('   Password: officer123');
    console.log('   Categories: Street Light, Noise Pollution');
    console.log('');
    console.log('5. Health Officer');
    console.log('   Email:    health.officer@gmccp.gov.in');
    console.log('   Password: officer123');
    console.log('   Categories: Public Health');
    console.log('');
    console.log('6. Parks & Gardens Officer');
    console.log('   Email:    parks.officer@gmccp.gov.in');
    console.log('   Password: officer123');
    console.log('   Categories: Park Maintenance');
    console.log('');
    console.log('7. Building & Town Planning Officer');
    console.log('   Email:    building.officer@gmccp.gov.in');
    console.log('   Password: officer123');
    console.log('   Categories: Illegal Construction');
    console.log('');
    console.log('--- CITIZENS ---');
    console.log('Email:    citizen@gmail.com / Password: citizen123');
    console.log('Email:    meera@gmail.com   / Password: citizen123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
