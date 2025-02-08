const express = require("express");
const router = express.Router();
const jobseekersController = require("../controller/jobseeker/jobseekersController");
const authenticateToken = require("../middlewares/authenticateToken");
const checkDuplicateEmail = require("../middlewares/checkDuplicateEmail");

router.get("/", jobseekersController.getAllJobseekers);
router.get("/:id", jobseekersController.getJobseekerById);
router.post("/", checkDuplicateEmail, jobseekersController.createJobseeker);
router.put("/:id", authenticateToken, jobseekersController.updateJobseeker);
router.delete("/:id",  jobseekersController.deleteJobseeker);
router.get("/profile", authenticateToken, jobseekersController.getProfile);

module.exports = router;