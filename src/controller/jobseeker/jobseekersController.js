const jobseekersService = require("../../service/jobseekersService");

const getAllJobseekers = async (req, res) => {
  try {
    const jobseekers = await jobseekersService.getAllJobseekers();
    res.json(jobseekers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobseekerById = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.getJobseekerById(req.params.id);
    if (jobseeker) {
      res.json(jobseeker);
    } else {
      res.status(404).json({ message: "Jobseeker not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJobseeker = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.createJobseeker(req.body);
    res.status(201).json(jobseeker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJobseeker = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.updateJobseeker(req.params.id, req.body);
    if (jobseeker) {
      res.json(jobseeker);
    } else {
      res.status(404).json({ message: "Jobseeker not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJobseeker = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.deleteJobseeker(req.params.id);
    if (jobseeker) {
      res.json({ message: "Jobseeker deleted" });
    } else {
      res.status(404).json({ message: "Jobseeker not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobseekers,
  getJobseekerById,
  createJobseeker,
  updateJobseeker,
  deleteJobseeker,
};