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
    console.error("Registration Error:", error);
    sendErrorResponse(res, error.message, 400); // Bad Request error if something fails
  }
};

module.exports = registerEmployer;
