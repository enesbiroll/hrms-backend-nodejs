const express = require("express");
const router = express.Router();
const jobseekerController = require("../controller/jobseeker/jobseekerController");
const authenticateToken = require("../middlewares/authenticateToken");

// Jobseekers API route'ları
router.get("/", jobseekerController.getAllJobseekers);          // Tüm iş arayanları al
router.get("/:id", jobseekerController.getJobseekerById);        // Bir iş arayanı ID ile al
router.post("/", jobseekerController.createJobseeker);           // Yeni iş arayan oluştur
router.put("/:id", jobseekerController.updateJobseeker);         // İş arayanı güncelle
router.delete("/:id", jobseekerController.deleteJobseeker);     // İş arayanı sil
// Profil getirme isteği, token doğrulaması ile yapılacak
router.get("/profile", authenticateToken, jobseekerController.getProfile);

module.exports = router;