const fs = require('fs');
const path = require('path');

const checkTempEmail = (req, res, next) => {
  const { email } = req.body;
  const emailDomain = email.split('@')[1];

  // JSON dosyasını oku
  fs.readFile(path.join(__dirname, 'tempEmailDomains.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading tempEmailDomains.json:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const tempEmailDomains = JSON.parse(data).tempEmailDomains;

    if (tempEmailDomains.includes(emailDomain)) {
      return res.status(400).json({ message: "Geçici e-posta adresleri kullanılamaz" });
    }

    next();
  });
};

module.exports = checkTempEmail;