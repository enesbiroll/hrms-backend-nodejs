const Users = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  // Kullanıcıyı bul
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Geçersiz email veya şifre" });
  }

  // Şifreyi kontrol et
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Geçersiz email veya şifre" });
  }

  // Kullanıcı rolünü belirle
  let role;
  if (await user.getJobseeker()) {
    role = "jobseeker";
  } else if (await user.getEmployer()) {
    role = "employer";
  }

  // JWT oluştur
  const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

module.exports = login;
