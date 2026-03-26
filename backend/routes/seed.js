const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Skill = require('../models/Skill');
const Job = require('../models/Job');
const Transaction = require('../models/Transaction');
const Application = require('../models/Application');

// @route   POST /api/seed/init
// @desc    Initialize database with demo data (ONE-TIME USE)
// @access  Public (but should be removed after first use)
router.post('/init', async (req, res) => {
  try {
    // Check if already seeded
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Database already seeded. Delete all data first if you want to re-seed.' 
      });
    }

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

    const createdSkills = await Skill.insertMany(skills);

    // Create demo users
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
      }
    ];

    const createdJobs = await Job.insertMany(jobData);

    // Seed applications
    await Application.create({
      job: createdJobs[0]._id,
      applicant: demoWoman._id,
      coverLetter: 'I have 3 years of experience in graphic design and would love to contribute.',
      status: 'accepted'
    });

    await Application.create({
      job: createdJobs[1]._id,
      applicant: demoWoman._id,
      coverLetter: 'Content writing is my passion. I write in both Hindi and English.',
      status: 'pending'
    });

    // Seed transactions
    const txData = [
      { user: demoWoman._id, type: 'income', amount: 22000, category: 'Graphic Design', description: 'February design project payment', date: new Date('2024-02-28') },
      { user: demoWoman._id, type: 'income', amount: 18000, category: 'Content Writing', description: 'Blog articles batch payment', date: new Date('2024-02-15') },
      { user: demoWoman._id, type: 'expense', amount: 3000, category: 'Tools & Software', description: 'Canva Pro subscription', date: new Date('2024-02-01') },
      { user: demoWoman._id, type: 'income', amount: 25000, category: 'Digital Marketing', description: 'Social media campaign March', date: new Date('2024-03-31') },
      { user: demoWoman._id, type: 'expense', amount: 2000, category: 'Internet', description: 'Broadband bill', date: new Date('2024-03-05') },
    ];

    await Transaction.insertMany(txData);

    res.json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        skills: createdSkills.length,
        users: 3,
        jobs: createdJobs.length,
        applications: 2,
        transactions: txData.length
      },
      credentials: {
        woman: { email: 'priya@demo.com', password: 'demo1234' },
        employer: { email: 'employer@demo.com', password: 'demo1234' },
        admin: { email: 'admin@worknest.com', password: 'demo1234' }
      }
    });

  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
