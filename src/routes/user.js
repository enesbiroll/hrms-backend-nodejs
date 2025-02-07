const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const jobseekerController = require("../controller/jobseeker/jobseekersController");
const employerController = require("../controller/employer/employerController");

router.get("/profile", authenticateToken, (req, res) => {
    if (req.user.role === "jobseeker") {
      jobseekerController.getJobseekerProfile(req, res);
    } else if (req.user.role === "employer") {
        employerController.getEmployerProfile(req, res);
    } else {
      res.status(403).json({ message: "Invalid role" });
    }
  });

module.exports = router;