const employerService = require("../../service/employerService");
const { sendSuccessResponse, sendErrorResponse } = require("../../core/response/response");
const { DATA_FETCH_SUCCESSFULLY, DATA_NOT_FOUND, STATUS_NOT_FOUND, STATUS_SERVER_ERROR } = require("../../core/utils/propertyResolver");

const getAllEmployers = async (req, res) => {
  try {
    const employers = await employerService.getAllEmployers();
    sendSuccessResponse(res, "SUCCESS", employers);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};

const getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await employerService.getEmployerById(id);
    if (!employer) {
      sendErrorResponse(res, "Employer not found", 404);
    }
    sendSuccessResponse(res, "Employer retrieved successfully", employer);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const createEmployer = async (req, res) => {
  try {
    const employerData = req.body;
    const employer = await employerService.createEmployer(employerData);
    sendSuccessResponse(res, "Employer created successfully", employer);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const employerData = req.body;
    const updatedEmployer = await employerService.updateEmployer(id, employerData);
    if (!updatedEmployer) {
      sendErrorResponse(res, "Employer not found", 404);
    }
    return res.status(200).json(updatedEmployer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployer = await employerService.deleteEmployer(id);
    if (!deletedEmployer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    return res.status(200).json({ message: "Employer deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await employerService.getProfile(userId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getEmployerProfile = async (req, res) => {
  try {
    const profile = await employerService.getProfile(req.user.id);
    if (profile) {
      sendSuccessResponse(res, `${DATA_FETCH_SUCCESSFULLY}`, profile);
    } else {
      sendErrorResponse(res, `${DATA_NOT_FOUND}`, STATUS_NOT_FOUND);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};


module.exports = {
  getAllEmployers,
  getEmployerById,
  createEmployer,
  updateEmployer,
  deleteEmployer,
  getProfile,
  getEmployerProfile
};
