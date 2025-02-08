const { sendErrorResponse, sendSuccessResponse } = require("../../core/response/response");
const { registerJobseeker } = require("../../service/auth/registerJobseekerService");
const { IDENTITY_OR_EMAIL_EXIST } = require("../../core/utils/propertyResolver").ERROR_MESSAGE;
const { USER_CREATED } = require("../../core/utils/propertyResolver").SUCCESS_MESSAGE;
const { STATUS_SERVER_ERROR } = require("../../core/utils/propertyResolver").STATUS_CODE;

const registerJobseekerController = async (req, res) => {
  const { email, password, first_name, last_name, identity_number, birth_date, race } = req.body;

  try {
    const { token, jobseeker, message } = await registerJobseeker(email, password, first_name, last_name, identity_number, birth_date, race);
    sendSuccessResponse(res, USER_CREATED, { token, jobseeker, message });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return sendErrorResponse(res, IDENTITY_OR_EMAIL_EXIST, STATUS_SERVER_ERROR);
    }
    console.error("Error:", error);
    sendErrorResponse(res, error.message, STATUS_SERVER_ERROR);
  }
};

module.exports = registerJobseekerController;