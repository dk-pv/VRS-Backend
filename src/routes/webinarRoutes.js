const express = require("express");
const router = express.Router();
const webinarController = require("../controllers/webinarController");

router.post("/", webinarController.createWebinar);
router.get("/", webinarController.getWebinars);
router.put("/:id", webinarController.updateWebinar);
router.delete("/:id", webinarController.deleteWebinar);

module.exports = router;