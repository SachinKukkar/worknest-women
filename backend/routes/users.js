const express = require('express');
const router = express.Router();
const { updateProfile, addSkills, getDashboardStats } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.post('/skills', protect, addSkills);
router.get('/dashboard', protect, getDashboardStats);

module.exports = router;
