const employersService = require("../../service/employerService");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../core/response/response");
const { DATA_NOT_FOUND, SOMETHING_WENT_WRONG } =
  require("../../core/utils/propertyResolver").ERROR_MESSAGE;
const { DATA_FETCH_SUCCESSFULLY, USER_CREATED, USER_UPDATED, USER_DELETED } =
  require("../../core/utils/propertyResolver").SUCCESS_MESSAGE;

const { STATUS_SERVER_ERROR, STATUS_NOT_FOUND } =
  require("../../core/utils/propertyResolver").STATUS_CODE;

const getAllEmployers = async (req, res) => {
  try {
    const employers = await employersService.getAllEmployers();
    if (employers) {
      sendSuccessResponse(res, `${DATA_FETCH_SUCCESSFULLY}`, employers);
    } else {
      sendErrorResponse(res, `${DATA_NOT_FOUND}`, STATUS_NOT_FOUND);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};

const getEmployerById = async (req, res) => {
  try {
    const employer = await employersService.getEmployerById(req.params.id);
    if (employer) {
      sendSuccessResponse(res, `${DATA_FETCH_SUCCESSFULLY}`, employer);
    } else {
      sendErrorResponse(res, `${DATA_NOT_FOUND}`, STATUS_NOT_FOUND);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};

const createEmployer = async (req, res) => {
  try {
    const employer = await employersService.createEmployer(req.body);
    if (employer) {
      sendSuccessResponse(res, `${USER_CREATED}`, employer);
    } else {
      sendErrorResponse(res, `${SOMETHING_WENT_WRONG}`, STATUS_NOT_FOUND);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};

const updateEmployer = async (req, res) => {
  try {
    const employer = await employersService.updateEmployer(
      req.params.id,
      req.body
    );
    if (employer) {
      sendSuccessResponse(res, `${USER_UPDATED}`, employer);
    } else {
      sendErrorResponse(res, `${DATA_NOT_FOUND}`, STATUS_NOT_FOUND);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const employer = await employersService.deleteEmployer(req.params.id);
    if (employer) {
      sendSuccessResponse(res, `${USER_DELETED}`);
    } else {
      sendErrorResponse(res, `${DATA_NOT_FOUND}`, STATUS_NOT_FOUND);
    }
  } catch (error) {
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};

const getEmployerProfile = async (req, res) => {
  try {
    const profile = await employersService.getProfile(req.user.id);
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
  getEmployerProfile,
};
