const jobAdvertsService = require("../../service/jobAdvertsService");
const { sendSuccessResponse, sendErrorResponse } = require("../../core/response/response");

const createJobAdvert = async (req, res) => {
  try {
    const jobAdvertData = req.body;
    const jobAdvert = await jobAdvertsService.createJobAdvert(jobAdvertData);
    sendSuccessResponse(res, "Job Advert created successfully", jobAdvert);
  } catch (error) {
    console.error("Error creating Job Advert:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const getJobAdvertById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobAdvert = await jobAdvertsService.getJobAdvertById(id);
    if (!jobAdvert) {
      return sendErrorResponse(res, "Job Advert not found", 404); // Not Found
    }
    sendSuccessResponse(res, "Job Advert retrieved successfully", jobAdvert);
  } catch (error) {
    console.error("Error retrieving Job Advert:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const updateJobAdvert = async (req, res) => {
  const { id } = req.params;
  const jobAdvertData = req.body;
  try {
    const updatedJobAdvert = await jobAdvertsService.updateJobAdvert(id, jobAdvertData);
    if (!updatedJobAdvert[0]) {
      return sendErrorResponse(res, "Job Advert not found", 404); // Not Found
    }
    sendSuccessResponse(res, "Job Advert updated successfully", updatedJobAdvert);
  } catch (error) {
    console.error("Error updating Job Advert:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const deleteJobAdvert = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJobAdvert = await jobAdvertsService.deleteJobAdvert(id);
    if (!deletedJobAdvert) {
      return sendErrorResponse(res, "Job Advert not found", 404); // Not Found
    }
    sendSuccessResponse(res, "Job Advert deleted successfully", deletedJobAdvert);
  } catch (error) {
    console.error("Error deleting Job Advert:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

const getAllJobAdverts = async (req, res) => {
  const { filters, page, limit } = req.query;
  try {
    const { count, rows } = await jobAdvertsService.getAllJobAdverts(filters, page, limit);
    sendSuccessResponse(res, "Job Adverts retrieved successfully", { count, rows, page, limit });
  } catch (error) {
    console.error("Error retrieving Job Adverts:", error);
    sendErrorResponse(res, error.message, 500); // Internal Server Error
  }
};

module.exports = {
  createJobAdvert,
  getJobAdvertById,
  updateJobAdvert,
  deleteJobAdvert,
  getAllJobAdverts,
};
