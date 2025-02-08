const express = require("express");
const router = express.Router();
const registerJobseeker = require("../controller/auth/registerJobseeker");
const registerEmployer = require("../controller/auth/registerEmployer");
const login = require("../controller/auth/login");
const { validateRegisterEmployer, validateRegisterJobseeker } = require("../middlewares/validationMiddleware");
const checkTempEmail = require("../core/validations/auth/checkTempEmail");

router.post("/register/jobseeker", validateRegisterJobseeker, checkTempEmail, registerJobseeker);
router.post("/register/employer", validateRegisterEmployer, checkTempEmail, registerEmployer);
router.post("/login", login);

module.exports = router;