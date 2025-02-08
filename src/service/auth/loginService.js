const Users = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (email, password) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  let role;
  if (await user.getJobseeker()) {
    role = "jobseeker";
  } else if (await user.getEmployer()) {
    role = "employer";
  }

  const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = { login };
