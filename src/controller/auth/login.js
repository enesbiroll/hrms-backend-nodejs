const { sendSuccessResponse, sendErrorResponse } = require("../../core/response/response");
const loginService = require("../../service/auth/loginService");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginService.login(email, password);
    sendSuccessResponse(res, "User successfully logged in", token);
  } catch (error) {
    console.error("Login Error:", error);
    sendErrorResponse(res, error.message, 401); // Unauthorized error if login fails
  }
};

module.exports = login;
