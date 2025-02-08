const Users = require("../../models/user");
const Employers = require("../../models/employer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const registerEmployer = async (req, res) => {
  const { email, password, company_name, website, phone_number } = req.body;

  try {
    // Email doğrulaması
    const existingUser = await Users.findOne({ where: { email } });
    if (body(email).isEmail().not()) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    

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

    // Yeni işveren oluştur
    const employer = await Employers.create({
      user_id: user.id,
      company_name,
      website,
      phone_number,
    });

    // JWT oluştur
    const token = jwt.sign({ id: user.id, role: "employer" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, employer });
  } catch (error) {
    console.error("Error:", error); // Hata mesajını loglayalım
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerEmployer;