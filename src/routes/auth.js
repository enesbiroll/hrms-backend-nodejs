const express = require("express");
const router = express.Router();
const registerJobseeker = require("../controller/auth/registerJobseeker");
const registerEmployer = require("../controller/auth/registerEmployer");
const login = require("../controller/auth/login");
const {validateRegisterEmployer, validateRegisterJobseeker} = require("../middlewares/validationMiddleware")


router.post("/register/jobseeker", registerJobseeker, validateRegisterJobseeker);
router.post("/register/employer", registerEmployer, validateRegisterEmployer);
router.post("/login", login);

module.exports = router;