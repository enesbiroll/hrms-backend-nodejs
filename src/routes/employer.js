const express = require("express");
const router = express.Router();
const employerController = require("../controller/employer/employerController");
const authenticateToken = require("../middlewares/authenticateToken");
const checkDuplicateEmail = require("../middlewares/checkDuplicateEmail");

// Employer routes
router.get("/employers", authenticateToken, employerController.getAllEmployers);
router.get("/employers/:id", authenticateToken, employerController.getEmployerById);
router.post("/employers", checkDuplicateEmail, employerController.createEmployer);
router.put("/employers/:id", authenticateToken, employerController.updateEmployer);
router.delete("/employers/:id", authenticateToken, employerController.deleteEmployer);
router.get("/profile", authenticateToken, employerController.getEmployerProfile);

module.exports = router;