// middleware/validationMiddleware.js
const { body, validationResult } = require("express-validator");

const validateRegisterEmployer = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("company_name").notEmpty().withMessage("Company name is required"),
  body("website").isURL().withMessage("Please enter a valid URL"),
  body("phone_number").isMobilePhone().withMessage("Please enter a valid phone number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateRegisterJobseeker = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("identity_number").isLength({ min: 11, max: 11 }).withMessage("Identity number must be 11 characters long"),
  body("birth_date").isDate().withMessage("Please enter a valid birth date"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegisterEmployer, validateRegisterJobseeker };