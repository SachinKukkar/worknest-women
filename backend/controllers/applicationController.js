const Application = require('../models/Application');
const Job = require('../models/Job');

exports.getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email phone location bio skills')
      .populate({ path: 'applicant', populate: { path: 'skills', select: 'name icon category' } })
      .sort({ appliedAt: -1 });
    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const existing = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (existing) return res.status(409).json({ success: false, message: 'Already applied to this job' });

    const application = await Application.create({ job: jobId, applicant: req.user._id, coverLetter });
    await Job.findByIdAndUpdate(jobId, { $addToSet: { applicants: req.user._id } });
    res.status(201).json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate({ path: 'job', populate: { path: 'skills' } })
      .sort({ appliedAt: -1 });
    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, interviewDate, notes } = req.body;
    const update = { status, updatedAt: Date.now() };
    if (interviewDate) update.interviewDate = interviewDate;
    if (notes !== undefined) update.notes = notes;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    ).populate('job applicant');
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
