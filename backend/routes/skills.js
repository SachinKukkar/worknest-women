const express = require('express');
const router = express.Router();
const { getSkills, createSkill, upsertSkill } = require('../controllers/skillController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getSkills);
router.post('/upsert', protect, upsertSkill);
router.post('/', protect, authorize('admin'), createSkill);

module.exports = router;
