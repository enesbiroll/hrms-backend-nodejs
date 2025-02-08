const Users = require("../../models/user");
const Employers = require("../../models/employer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerEmployerService = async (
  email,
  password,
  company_name,
  website,
  phone_number
) => {
  // Check if email is already in use
  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  // Email validation
  if (!email || !email.includes("@")) {
    throw new Error("Please enter a valid email address");
  }

  // Hash the password
  if (!password) {
    throw new Error("Password is required");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await Users.create({
    email,
    password: hashedPassword,
  });

  // Create new employer
  const employer = await Employers.create({
    user_id: user.id,
    company_name,
    website,
    phone_number,
  });

  // Create JWT
  const token = jwt.sign(
    { id: user.id, role: "employer" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { token, employer };
};

module.exports = { registerEmployerService };
