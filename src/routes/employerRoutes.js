const express = require("express");
const router = express.Router();
const employerController = require("../controller/employer/employerController");
const authenticateToken = require("../middlewares/authenticateToken");


// Employers API route'ları
router.get("/", employerController.getAllEmployers);          // Tüm işverenleri al
router.get("/:id", employerController.getEmployerById);       // Bir işvereni ID ile al
router.post("/", employerController.createEmployer);          // Yeni işveren oluştur
router.put("/:id", employerController.updateEmployer);        // İşvereni güncelle
router.delete("/:id", employerController.deleteEmployer);    // İşvereni sil

module.exports = router;
