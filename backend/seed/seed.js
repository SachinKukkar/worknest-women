require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Skill = require('../models/Skill');
const Job = require('../models/Job');
const Transaction = require('../models/Transaction');
const Application = require('../models/Application');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/worknest';

const skills = [
  { name: 'Tailoring & Stitching', category: 'Handcraft', icon: '🧵', demandLevel: 'High', avgPay: 12000, description: 'Garment making and alterations' },
  { name: 'Data Entry', category: 'Digital', icon: '💻', demandLevel: 'High', avgPay: 15000, description: 'Accurate data input and management' },
  { name: 'Graphic Design', category: 'Digital', icon: '🎨', demandLevel: 'High', avgPay: 22000, description: 'Visual design for brands and media' },
  { name: 'Content Writing', category: 'Digital', icon: '✍️', demandLevel: 'High', avgPay: 18000, description: 'Blog, social media and marketing copy' },
  { name: 'Cooking & Catering', category: 'Food', icon: '🍳', demandLevel: 'Medium', avgPay: 14000, description: 'Home and commercial food preparation' },
  { name: 'Teaching & Tutoring', category: 'Education', icon: '📚', demandLevel: 'High', avgPay: 20000, description: 'Academic and skill tutoring' },
  { name: 'Beauty & Makeup', category: 'Beauty', icon: '💄', demandLevel: 'High', avgPay: 16000, description: 'Professional beauty services' },
  { name: 'Handicrafts', category: 'Handcraft', icon: '🪡', demandLevel: 'Medium', avgPay: 10000, description: 'Pottery, weaving, embroidery' },
  { name: 'Digital Marketing', category: 'Digital', icon: '📱', demandLevel: 'High', avgPay: 25000, description: 'Social media and online marketing' },
  { name: 'Web Development', category: 'Technology', icon: '🌐', demandLevel: 'High', avgPay: 35000, description: 'Building websites and web apps' },
  { name: 'Translation', category: 'Language', icon: '🗣️', demandLevel: 'Medium', avgPay: 17000, description: 'Language translation services' },
  { name: 'Customer Support', category: 'Digital', icon: '🎧', demandLevel: 'High', avgPay: 14000, description: 'Phone and chat customer service' },
  { name: 'Yoga & Fitness', category: 'Wellness', icon: '🧘', demandLevel: 'Medium', avgPay: 18000, description: 'Fitness coaching and wellness' },
  { name: 'Photography', category: 'Creative', icon: '📸', demandLevel: 'Medium', avgPay: 20000, description: 'Event and product photography' },
  { name: 'Accounting', category: 'Finance', icon: '📊', demandLevel: 'High', avgPay: 28000, description: 'Bookkeeping and financial management' },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Skill.deleteMany({}),
    Job.deleteMany({}),
    Transaction.deleteMany({}),
    Application.deleteMany({})
  ]);
  console.log('🗑️  Cleared old data');

  // Seed skills
  const createdSkills = await Skill.insertMany(skills);
  console.log(`✅ Seeded ${createdSkills.length} skills`);

  // Create demo users — plain text passwords, model pre('save') hook hashes them
  const demoWoman = await User.create({
    name: 'Priya Sharma',
    email: 'priya@demo.com',
    password: 'demo1234',
    role: 'woman',
    phone: '9876543210',
    location: 'Jaipur, Rajasthan',
    bio: 'Skilled in digital work and content creation. Looking for remote opportunities.',
    skills: [createdSkills[2]._id, createdSkills[3]._id, createdSkills[8]._id],
    totalEarnings: 45000
  });

  const employer = await User.create({
    name: 'Ravi Enterprises',
    email: 'employer@demo.com',
    password: 'demo1234',
    role: 'employer',
    location: 'Mumbai, Maharashtra',
    bio: 'We hire skilled women for remote and flexible work.'
  });

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@worknest.com',
    password: 'demo1234',
    role: 'admin',
    location: 'Delhi, India',
  });

  console.log('✅ Created demo users');

  // Seed jobs
  const jobData = [
    {
      title: 'Remote Graphic Designer',
      company: 'Creative Studio',
      description: 'We are looking for a creative graphic designer to work on branding, social media posts, and marketing collateral. Flexible timings, work from home.',
      requirements: ['2+ years experience', 'Canva or Photoshop skills', 'Good communication', 'Portfolio required'],
      skills: [createdSkills[2]._id],
      type: 'remote',
      category: 'Design',
      salary: { min: 18000, max: 28000, currency: 'INR', period: 'monthly' },
      location: 'Remote',
      postedBy: employer._id,
      isWomenOnly: true,
      tags: ['design', 'creative', 'remote', 'flexible']
    },
    {
      title: 'Content Writer – Hindi & English',
      company: 'Digital Media House',
      description: 'Write engaging blog posts, social media captions and product descriptions. Work from home with flexible hours.',
      requirements: ['Strong writing skills', 'Hindi & English fluency', 'SEO knowledge a plus'],
      skills: [createdSkills[3]._id],
      type: 'remote',
      category: 'Writing',
      salary: { min: 15000, max: 22000, currency: 'INR', period: 'monthly' },
      location: 'Remote',
      postedBy: employer._id,
      isWomenOnly: true,
      tags: ['writing', 'content', 'hindi', 'english', 'remote']
    },
    {
      title: 'Online Tutor – Mathematics',
      company: 'EduBridge Learning',
      description: 'Teach students from Class 6–10 Mathematics online. Flexible scheduling, set your own timings.',
      requirements: ['B.Sc or B.Ed preferred', 'Strong maths foundation', 'Good internet connection'],
      skills: [createdSkills[5]._id],
      type: 'remote',
      category: 'Education',
      salary: { min: 500, max: 800, currency: 'INR', period: 'hourly' },
      location: 'Remote',
      postedBy: employer._id,
      isWomenOnly: false,
      tags: ['teaching', 'tutor', 'online', 'maths']
    },
    {
      title: 'Home Baker – Bulk Orders',
      company: 'SweetNest Bakery',
      description: 'Prepare cakes and confections for events. Orders given weekly. Work from your kitchen.',
      requirements: ['Baking experience', 'Hygiene certified', 'Own oven'],
      skills: [createdSkills[4]._id],
      type: 'freelance',
      category: 'Food',
      salary: { min: 8000, max: 20000, currency: 'INR', period: 'monthly' },
      location: 'Jaipur',
      postedBy: employer._id,
      isWomenOnly: true,
      tags: ['baking', 'food', 'freelance', 'home-based']
    },
    {
      title: 'Data Entry Operator',
      company: 'InfoTech Solutions',
      description: 'Enter and manage data into company systems. Full-time remote role with fixed pay.',
      requirements: ['Typing speed 40+ WPM', 'Basic computer knowledge', 'Attention to detail'],
      skills: [createdSkills[1]._id],
      type: 'remote',
      category: 'Data',
      salary: { min: 12000, max: 16000, currency: 'INR', period: 'monthly' },
      location: 'Remote',
      postedBy: employer._id,
      isWomenOnly: false,
      tags: ['data', 'entry', 'remote', 'full-time']
    },
    {
      title: 'Digital Marketing Executive',
      company: 'GrowthLab Agency',
      description: 'Manage social media accounts, run ad campaigns, and track performance metrics for our clients.',
      requirements: ['Facebook & Instagram Ads experience', 'Analytics knowledge', 'Creative mindset'],
      skills: [createdSkills[8]._id],
      type: 'remote',
      category: 'Marketing',
      salary: { min: 20000, max: 32000, currency: 'INR', period: 'monthly' },
      location: 'Remote',
      postedBy: employer._id,
      isWomenOnly: true,
      tags: ['marketing', 'social media', 'digital', 'remote']
    },
    {
      title: 'Beauty Consultant (Home Visits)',
      company: 'Glam on Call',
      description: 'Provide bridal and party makeup services at clients\' homes. Set your own availability.',
      requirements: ['Makeup certification', 'Own kit', 'Good communication'],
      skills: [createdSkills[6]._id],
      type: 'freelance',
      category: 'Beauty',
      salary: { min: 1500, max: 5000, currency: 'INR', period: 'daily' },
      location: 'Jaipur / Ajmer',
      postedBy: employer._id,
      isWomenOnly: true,
      tags: ['beauty', 'makeup', 'freelance', 'bridal']
    },
    {
      title: 'Tailoring – Bulk Garment Work',
      company: 'FashionHub Exports',
      description: 'Stitch garments at home as per provided patterns. Material delivered to your door.',
      requirements: ['Stitching experience 2+ years', 'Own sewing machine', 'Reliable delivery'],
      skills: [createdSkills[0]._id],
      type: 'freelance',
      category: 'Handcraft',
      salary: { min: 10000, max: 18000, currency: 'INR', period: 'monthly' },
      location: 'Jaipur',
      postedBy: employer._id,
      isWomenOnly: true,
      tags: ['tailoring', 'stitching', 'handcraft', 'home-based']
    }
  ];

  const createdJobs = await Job.insertMany(jobData);
  console.log(`✅ Seeded ${createdJobs.length} jobs`);

  // Seed applications for demo user
  const app1 = await Application.create({
    job: createdJobs[0]._id,
    applicant: demoWoman._id,
    coverLetter: 'I have 3 years of experience in graphic design and would love to contribute.',
    status: 'accepted'
  });
  const app2 = await Application.create({
    job: createdJobs[1]._id,
    applicant: demoWoman._id,
    coverLetter: 'Content writing is my passion. I write in both Hindi and English.',
    status: 'pending'
  });
  console.log('✅ Created demo applications');

  // Seed transactions for demo user
  const txData = [
    { user: demoWoman._id, type: 'income', amount: 22000, category: 'Graphic Design', description: 'February design project payment', date: new Date('2024-02-28') },
    { user: demoWoman._id, type: 'income', amount: 18000, category: 'Content Writing', description: 'Blog articles batch payment', date: new Date('2024-02-15') },
    { user: demoWoman._id, type: 'expense', amount: 3000, category: 'Tools & Software', description: 'Canva Pro subscription', date: new Date('2024-02-01') },
    { user: demoWoman._id, type: 'income', amount: 25000, category: 'Digital Marketing', description: 'Social media campaign March', date: new Date('2024-03-31') },
    { user: demoWoman._id, type: 'expense', amount: 2000, category: 'Internet', description: 'Broadband bill', date: new Date('2024-03-05') },
    { user: demoWoman._id, type: 'income', amount: 20000, category: 'Graphic Design', description: 'Logo design for startup', date: new Date('2024-03-20') },
    { user: demoWoman._id, type: 'expense', amount: 5000, category: 'Training', description: 'Photoshop advanced course', date: new Date('2024-03-10') },
    { user: demoWoman._id, type: 'income', amount: 30000, category: 'Digital Marketing', description: 'April campaign + bonus', date: new Date('2024-04-30') },
    { user: demoWoman._id, type: 'expense', amount: 1500, category: 'Internet', description: 'Mobile data pack', date: new Date('2024-04-05') },
    { user: demoWoman._id, type: 'income', amount: 15000, category: 'Content Writing', description: 'Newsletter writing – April', date: new Date('2024-04-15') },
  ];

  await Transaction.insertMany(txData);
  console.log('✅ Seeded transactions');

  console.log('\n🎉 Seed complete! Demo credentials:');
  console.log('   👩 Woman  → priya@demo.com     / demo1234');
  console.log('   🏢 Employer → employer@demo.com / demo1234');
  console.log('   🔑 Admin  → admin@worknest.com / demo1234');
  process.exit(0);
}

seed().catch(err => { console.error('Seed failed:', err); process.exit(1); });
