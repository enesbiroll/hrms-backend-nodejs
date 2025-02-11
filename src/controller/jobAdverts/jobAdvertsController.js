const jobAdvertsService = require("../../service/jobAdvertsService");
const { sendSuccessResponse, sendErrorResponse } = require("../../core/response/response");
const { pageDataSuccessResponse } = require("../../core/response/response");

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

// Redis Cache'i temizle
const clearCache = async (req, res) => {
  try {
      await jobAdvertsService.clearCache();
      sendSuccessResponse(res, "Cache temizlendi!", null);
  } catch (error) {
      sendErrorResponse(res, error.message, 500);
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
  const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const { count, rows } = await jobAdvertsService.getAllJobAdverts(filters, page, limit);
    const totalPages = Math.ceil(count / limit);

    const nextPage = page < totalPages ? `http://localhost:8000/jobAdverts?page=${page + 1}&limit=${limit}` : null;
    const prevPage = page > 1 ? `http://localhost:8000/jobAdverts?page=${page - 1}&limit=${limit}` : null;

    pageDataSuccessResponse(res, "Job Adverts retrieved successfully", rows, page, limit, count);
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
  clearCache
};