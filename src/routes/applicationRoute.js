const express = require("express");
const router = express.Router();
const applicationsController = require("../controller/application/applicationsController");

// Applications API routes
router.post("/", applicationsController.createApplication);        // Yeni başvuru oluştur
router.get("/:id", applicationsController.getApplicationById);     // ID ile başvuru al
router.put("/:id", applicationsController.updateApplication);      // Başvuruyu güncelle
router.delete("/:id", applicationsController.deleteApplication);  // Başvuruyu sil
router.get("/", applicationsController.getAllApplications);        // Tüm başvuruları al

module.exports = router;