const jobseekersService = require("../../service/jobseekersService");
const { sendSuccessResponse, sendErrorResponse } = require("../../core/response/response");

const getAllJobseekers = async (req, res) => {
  try {
    const jobseekers = await jobseekersService.getAllJobseekers();
    sendSuccessResponse(res, "Jobseekers fetched successfully", jobseekers);
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const getJobseekerById = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.getJobseekerById(req.params.id);
    if (jobseeker) {
      sendSuccessResponse(res, "Jobseeker fetched successfully", jobseeker);
    } else {
      sendErrorResponse(res, "Jobseeker not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const createJobseeker = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.createJobseeker(req.body);
    sendSuccessResponse(res, "Jobseeker created successfully", jobseeker);
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const updateJobseeker = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.updateJobseeker(req.params.id, req.body);
    if (jobseeker) {
      sendSuccessResponse(res, "Jobseeker updated successfully", jobseeker);
    } else {
      sendErrorResponse(res, "Jobseeker not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};



const deleteJobseeker = async (req, res) => {
  try {
    const jobseeker = await jobseekersService.deleteJobseeker(req.params.id);
    if (jobseeker) {
      sendSuccessResponse(res, "Jobseeker deleted successfully");
    } else {
      sendErrorResponse(res, "Jobseeker not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await jobseekersService.getProfile(req.user.id, req.user.role);
    if (profile) {
      sendSuccessResponse(res, "Profile fetched successfully", profile);
    } else {
      sendErrorResponse(res, "Profile not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};
const getJobseekerProfile = async (req, res) => {
  try {
    const profile = await jobseekersService.getProfile(req.user.id);
    if (profile) {
      sendSuccessResponse(res, "Profile fetched successfully", profile);
    } else {
      sendErrorResponse(res, "Profile not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllJobseekers,
  getJobseekerById,
  createJobseeker,
  updateJobseeker,
  deleteJobseeker,
  getProfile,
  getJobseekerProfile
};