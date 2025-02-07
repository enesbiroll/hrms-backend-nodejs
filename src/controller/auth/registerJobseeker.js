const Users = require("../../models/user");
const Jobseekers = require("../../models/jobseeker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerJobseeker = async (req, res) => {
  const { email, password, first_name, last_name, identity_number, birth_date } = req.body;

  try {
    // Şifreyi hashle
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = await Users.create({
      email,
      password: hashedPassword,
    });

    // Yeni iş arayan oluştur
    const jobseeker = await Jobseekers.create({
      user_id: user.id,
      first_name,
      last_name,
      identity_number,
      birth_date,
    });

    // JWT oluştur
    const token = jwt.sign({ id: user.id, role: "jobseeker" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, jobseeker });
  } catch (error) {
    console.error("Error:", error); // Hata mesajını loglayalım
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerJobseeker;