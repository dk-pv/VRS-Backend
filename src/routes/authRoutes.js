const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  createAdmin,
  getProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Login
router.post("/login", loginAdmin);

// Create Admin (Super Admin only)
router.post(
  "/create-admin",
  authMiddleware,
  roleMiddleware("superadmin"),
  createAdmin
);

// Get Profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
