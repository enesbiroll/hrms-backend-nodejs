const { sendErrorResponse, sendSuccessResponse } = require("../../core/response/response");
const { registerJobseeker } = require("../../service/auth/registerJobseekerService");

const registerJobseekerController = async (req, res) => {
  const { email, password, first_name, last_name, identity_number, birth_date, race } = req.body;

  try {
    const { token, jobseeker, message } = await registerJobseeker(
      email,
      password,
      first_name,
      last_name,
      identity_number,
      birth_date,
      race
    );

    // Başarılı kayıt durumunda tek bir mesaj ile geri dönüş
    sendSuccessResponse(res, message, {
      token,
      jobseeker
    });
  } catch (error) {
    console.error("Error during registration:", error);
    sendErrorResponse(res, error.message, 500);  // Sunucu hatası
  }
};

module.exports = registerJobseekerController;
