const express = require("express");
const router = express.Router();
const jobAdvertsController = require("../controller/jobAdverts/jobAdvertsController");

// Job Advert API routes
router.post("/", jobAdvertsController.createJobAdvert);        // Yeni iş ilanı oluştur
router.get("/:id", jobAdvertsController.getJobAdvertById);     // ID ile iş ilanı al
router.put("/:id", jobAdvertsController.updateJobAdvert);      // İş ilanını güncelle
router.delete("/:id", jobAdvertsController.deleteJobAdvert);  // İş ilanını sil
router.get("/", jobAdvertsController.getAllJobAdverts);        // Tüm iş ilanlarını al
router.get("/clear-cache", jobAdvertsController.clearCache);
module.exports = router;