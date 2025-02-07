const express = require("express");
const router = express.Router();
const registerJobseeker = require("../controller/auth/registerJobseeker");
const registerEmployer = require("../controller/auth/registerEmployer");
const login = require("../controller/auth/login");

router.post("/register/jobseeker", registerJobseeker);
router.post("/register/employer", registerEmployer);
router.post("/login", login);

module.exports = router;