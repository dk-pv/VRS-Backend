const express = require("express");
const router = express.Router();
const controller = require("../controllers/securedPropertyController");
const upload = require("../middleware/upload");



// Admin Routes
router.post(
  "/",
  upload.single("image"), // important: same field name
  controller.createProperty
);
router.put("/:id", controller.updateProperty);
router.delete("/:id", controller.deleteProperty);

// Public Route
router.get("/", controller.getAllProperties);

module.exports = router;
