const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const app = express();
const authRouter = require("./src/routes/auth");
const jobseekersRouter = require("./src/routes/jobseekers");

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/jobseekers", jobseekersRouter);

// server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    console.log(`App is running on ${PORT}`);
    // db connection
    await sequelize.authenticate();
    console.log("Db Connection has been established successfully.");
  } catch (error) {
    console.log(`Error ${error}`, error.message);
  }
});
