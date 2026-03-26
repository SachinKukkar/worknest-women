const express = require('express');
const router = express.Router();
const { getJobs, getJob, createJob, getRecommendedJobs, getMyJobs, updateJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getJobs);
router.get('/recommended', protect, getRecommendedJobs);
router.get('/my', protect, authorize('employer', 'admin'), getMyJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('employer', 'admin'), createJob);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);

module.exports = router;
