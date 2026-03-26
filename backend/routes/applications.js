const express = require('express');
const router = express.Router();
const { applyJob, getMyApplications, updateStatus, getJobApplications } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, applyJob);
router.get('/my', protect, getMyApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateStatus);

module.exports = router;
