// controllers/jobseekerController.js
const { registerJobseekerService } = require("../../service/auth/registerJobseekerService");

const registerJobseekerController = async (req, res) => {
  const { email, password, first_name, last_name, identity_number, birth_date } = req.body;

  try {
    const { token, jobseeker } = await registerJobseekerService(email, password, first_name, last_name, identity_number, birth_date);
    res.json({ token, jobseeker });
  } catch (error) {
    // Hata türüne göre özelleştirilmiş mesajlar
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Identity number or email must be unique' });
    }
    console.error("Error:", error); // Hata mesajını loglayalım
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerJobseekerController;