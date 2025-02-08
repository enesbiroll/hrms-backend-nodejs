const { sendErrorResponse, sendSuccessResponse } = require("../../core/response/response");
const { registerEmployerService } = require("../../service/auth/registerEmployerService");

const registerEmployer = async (req, res) => {
  const { email, password, company_name, website, phone_number } = req.body;

  try {
    const { token, employer } = await registerEmployerService(
      email,
      password,
      company_name,
      website,
      phone_number
    );

    sendSuccessResponse(res, "Employer created successfully", { token, employer });
  } catch (error) {
    if (!res.headersSent) {
      sendErrorResponse(res, error.message, "", 500);
    }
  }
};

module.exports = registerEmployer;