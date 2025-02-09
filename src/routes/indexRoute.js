const express = require("express");
const router = express.Router();

// Route'lar
const jobseekerRoutes = require("./jobseekerRoutes");
const employerRoutes = require("./employerRoutes");
const jobAdvertsRoutes = require("./jobAdvertsRoute");
const applicationsRoutes = require("./applicationRoute");
const authRouter = require("./authRoutes");  // Auth route'ını dahil ettik
const userRoutes = require("./userRoutes");  // Kullanıcı işlemleri için route

// Authentication (Giriş ve Kayıt) için route'lar
router.use("/auth", authRouter);

// Kullanıcı profili için route
router.use("/user", userRoutes);  // Burada GET işlemi gerçekleştirecek şekilde yapılandırabilirsiniz

// Jobseekers ve Employers için route'lar
router.use("/jobseekers", jobseekerRoutes);
router.use("/employers", employerRoutes);

// Job adverts ve applications için route'lar
router.use("/jobadverts", jobAdvertsRoutes);
router.use("/applications", applicationsRoutes);

module.exports = router;
