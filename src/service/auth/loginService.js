const Users = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (email, password) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }
  if (user.isDeleted) {
    throw new Error("User is deleted");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email or password is incorrect");
  }

  let role = null;
  if (await user.getJobseeker()) {
    role = "jobseeker";
  } else if (await user.getEmployer()) {
    role = "employer";
  }

  if (!role) {
    throw new Error("User does not have a valid role");
  }

  const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = { login };