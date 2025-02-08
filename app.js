const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const app = express();
const authRouter = require("./src/routes/auth");
const jobseekersRouter = require("./src/routes/jobseekers");
const userRoute = require("./src/routes/user");
const employerRoute = require("./src/routes/employer");
const multer = require("multer");

const upload = multer(); // multer middleware'ini oluştur

app.use(cors());
app.use(express.json()); // JSON verilerini işlemek için middleware

// Form-data verilerini işlemek için middleware
app.use(upload.none());

app.use("/auth", authRouter);
app.use("/jobseekers", jobseekersRouter);
app.use("/user",userRoute)
app.use("/employer",employerRoute)

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