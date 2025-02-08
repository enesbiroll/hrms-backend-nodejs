const Users = require("../../models/user");
const Jobseekers = require("../../models/jobseeker");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { turkishValidator } = require("../../core/validations/soap/soapValidator");

const registerJobseeker = async (email, password, first_name, last_name, identity_number, birth_date, race) => {
  let isActive = true;
  let message = "Registration successful.";

  if (race !== "tr") {
    isActive = false;
    message = "Registration successful. Your membership will be reviewed by admins.";
  } else {
    // Türk kimlik doğrulaması
    const isValidTurkish = await turkishValidator(identity_number, first_name, last_name, birth_date);
    if (!isValidTurkish) {
      throw new Error("You're not a valid Turkish person");
    }
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
    isActive: isActive,
  });

  // Yeni iş arayan oluştur
  const jobseeker = await Jobseekers.create({
    user_id: user.id,
    first_name,
    last_name,
    identity_number,
    birth_date,
    race, // race alanını ekleyin
  });

  // JWT oluştur
  const token = jwt.sign({ id: user.id, role: "jobseeker" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, jobseeker, message };
};

module.exports = { registerJobseeker };