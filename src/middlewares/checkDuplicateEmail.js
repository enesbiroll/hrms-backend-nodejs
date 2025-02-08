const Users = require("../models/user");

const checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = checkDuplicateEmail;