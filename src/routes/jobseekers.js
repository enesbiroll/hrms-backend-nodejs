const express = require("express");
const router = express.Router();
const jobseekersController = require("../controller/jobseeker/jobseekersController");
const auth = require("../middlewares/auth");

router.get("/", jobseekersController.getAllJobseekers);
router.get("/:id", jobseekersController.getJobseekerById);
router.post("/", auth, jobseekersController.createJobseeker);
router.put("/:id", auth, jobseekersController.updateJobseeker);
router.delete("/:id", auth, jobseekersController.deleteJobseeker);

module.exports = router;