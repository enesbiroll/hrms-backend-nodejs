const { sendSuccessResponse,sendErrorResponse } = require("../../core/response/response");
const  loginService = require("../../service/auth/loginService");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginService.login(email, password);
    sendSuccessResponse(res, "User successfully login", token);
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

module.exports = login;