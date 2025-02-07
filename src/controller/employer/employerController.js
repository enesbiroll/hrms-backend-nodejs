const employersService = require("../../service/employerService");
const { sendSuccessResponse, sendErrorResponse } = require("../../core/response/response");

const getAllEmployers = async (req, res) => {
  try {
    const employers = await employersService.getAllEmployers();
    sendSuccessResponse(res, "Employers fetched successfully", employers);
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const getEmployerById = async (req, res) => {
  try {
    const employer = await employersService.getEmployerById(req.params.id);
    if (employer) {
      sendSuccessResponse(res, "Employer fetched successfully", employer);
    } else {
      sendErrorResponse(res, "Employer not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const createEmployer = async (req, res) => {
  try {
    const employer = await employersService.createEmployer(req.body);
    sendSuccessResponse(res, "Employer created successfully", employer);
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const updateEmployer = async (req, res) => {
  try {
    const employer = await employersService.updateEmployer(req.params.id, req.body);
    if (employer) {
      sendSuccessResponse(res, "Employer updated successfully", employer);
    } else {
      sendErrorResponse(res, "Employer not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const employer = await employersService.deleteEmployer(req.params.id);
    if (employer) {
      sendSuccessResponse(res, "Employer deleted successfully");
    } else {
      sendErrorResponse(res, "Employer not found", 404);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const getEmployerProfile = async (req, res) => {
  try {
    const profile = await employersService.getProfile(req.user.id);
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
  getAllEmployers,
  getEmployerById,
  createEmployer,
  updateEmployer,
  deleteEmployer,
  getEmployerProfile,
};