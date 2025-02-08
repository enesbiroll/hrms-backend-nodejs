// services/employerService.js
const Users = require("../../models/user");
const Employers = require("../../models/employer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerEmployer = async (email, password, company_name, website, phone_number) => {
  // Email doğrulaması
  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Şifreyi hashle
  if (!password) {
    throw new Error("Password is required");
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

  return { token, employer };
};

module.exports = { registerEmployer };