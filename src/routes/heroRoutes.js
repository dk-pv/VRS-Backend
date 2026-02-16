const express = require("express");
const router = express.Router();
const {
  getHero,
  updateHero,
} = require("../controllers/heroController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getHero);
router.put("/", authMiddleware, updateHero);

module.exports = router;
