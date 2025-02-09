const { sendErrorResponse, sendSuccessResponse } = require("../../core/response/response");
const jobseekerService = require("../../service/jobseekerService");
const authenticateToken = require("../../middlewares/authenticateToken"); // JWT token doğrulaması

const getAllJobseekers = async (req, res) => {
  try {
    const jobseekers = await jobseekerService.getAllJobseekers();
    sendSuccessResponse(res, "Jobseekers retrieved successfully", jobseekers);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const getJobseekerById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobseeker = await jobseekerService.getJobseekerById(id);
    if (!jobseeker) {
      sendErrorResponse(res, "Jobseeker not found", 404);
    }
    sendSuccessResponse(res, "Jobseeker retrieved successfully", jobseeker);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const createJobseeker = async (req, res) => {
  try {
    const jobseekerData = req.body;
    const jobseeker = await jobseekerService.createJobseeker(jobseekerData);
    sendSuccessResponse(res, "Jobseeker created successfully", jobseeker);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const updateJobseeker = async (req, res) => {
  try {
    const { id } = req.params;
    const jobseekerData = req.body;
    const updatedJobseeker = await jobseekerService.updateJobseeker(id, jobseekerData);
    if (!updatedJobseeker) {
      sendErrorResponse(res, "Jobseeker not found", 404);
    }
    sendSuccessResponse(res, "Jobseeker updated successfully", updatedJobseeker);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const deleteJobseeker = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJobseeker = await jobseekerService.deleteJobseeker(id);
    if (!deletedJobseeker) {
      sendErrorResponse(res, "Jobseeker not found", 404);
    }
    sendSuccessResponse(res, "Jobseeker deleted successfully", deletedJobseeker);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

// Profil güncelleme işlemi token ile yapılıyor
const getProfile = async (req, res) => {
  try {
    // Token doğrulaması ve userId'yi almak için authenticateToken middleware'i kullanıyoruz
    const { user_id } = req.user;  // Token'dan alınan userId
    const profile = await jobseekerService.getProfile(user_id);  // userId'ye göre profile sorgulama
    if (!profile) {
      sendErrorResponse(res, "Profile not found", 404);
    }
    sendSuccessResponse(res, "Profile retrieved successfully", profile);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const getJobseekerProfile = async (req, res) => {
  try {
    const profile = await jobseekerService.getProfile(req.user.id);
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
