const Users = require("../../models/Users");
const Jobseekers = require("../../models/Jobseekers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { turkishValidator } = require("../../core/validations/soap/soapValidator"); // Turkish validator'ı dahil ettik

const registerJobseeker = async (
  email,
  password,
  first_name,
  last_name,
  identity_number,
  birth_date,
  race
) => {
  let message = "User created successfully";
  let isActive = true;

  // E-posta kontrolü
  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Eğer kullanıcı Türkse, kimlik doğrulamasını yap
  if (race === "tr") {
    const isValidTurkish = await turkishValidator(identity_number, first_name, last_name, birth_date);
    if (!isValidTurkish) {
      throw new Error("You're not a valid Turkish person");
    }
  } else {
    // Eğer kullanıcı yabancıysa, admin onay mesajı göster
    message = "Registration successful. Your membership will be reviewed by admins.";
    isActive = false;  // Yabancı kullanıcılar için aktiflik durumu false
  }

  // Şifreyi hashle
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
    race,
  });

  // JWT oluştur
  const token = jwt.sign({ id: user.id, role: "jobseeker" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, jobseeker, message };
};

module.exports = { registerJobseeker };
