const applicationsService = require("../../service/applicationsService");
const { sendSuccessResponse, sendErrorResponse } = require("../../core/response/response");

const createApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    const application = await applicationsService.createApplication(applicationData);
    sendSuccessResponse(res, "Application created successfully", application);
  } catch (error) {
    console.error("Error creating application:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const getApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await applicationsService.getApplicationById(id);
    if (!application) {
      return sendErrorResponse(res, "Application not found", 404); // Not Found
    }
    sendSuccessResponse(res, "Application retrieved successfully", application);
  } catch (error) {
    console.error("Error retrieving application:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const updateApplication = async (req, res) => {
  const { id } = req.params;
  const applicationData = req.body;
  try {
    const updatedApplication = await applicationsService.updateApplication(id, applicationData);
    if (!updatedApplication[0]) {
      return sendErrorResponse(res, "Application not found", 404); // Not Found
    }
    sendSuccessResponse(res, "Application updated successfully", updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedApplication = await applicationsService.deleteApplication(id);
    if (!deletedApplication) {
      return sendErrorResponse(res, "Application not found", 404); // Not Found
    }
    sendSuccessResponse(res, "Application deleted successfully", deletedApplication);
  } catch (error) {
    console.error("Error deleting application:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await applicationsService.getAllApplications();
    sendSuccessResponse(res, "Applications retrieved successfully", applications);
  } catch (error) {
    console.error("Error retrieving applications:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

module.exports = {
  createApplication,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getAllApplications,
};