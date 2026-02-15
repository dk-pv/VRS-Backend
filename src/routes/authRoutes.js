const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Login
router.post("/login", authController.loginAdmin);

// Create Admin
router.post(
  "/create-admin",
  authMiddleware,
  roleMiddleware("superadmin"),
  authController.createAdmin
);

// Get Profile
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile
);

module.exports = router;
