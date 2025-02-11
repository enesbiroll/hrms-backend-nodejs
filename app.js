const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const multer = require("multer");
const routes = require("./src/routes/indexRoute"); // indexRoute dosyasını dahil edin

const app = express();
const upload = multer(); // multer middleware'ini oluştur

app.use(cors());
app.use(express.json()); // JSON verilerini işlemek için middleware

// Form-data verilerini işlemek için middleware
app.use(upload.none());

app.use("/api/v1", routes); // Tüm rotaları kullan

// server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    console.log(`App is running on ${PORT}`);
    // db connection
    await sequelize.authenticate();
    console.log("Db Connection has been established successfully.");
  } catch (error) {
    console.log(`Error`);
  }
});