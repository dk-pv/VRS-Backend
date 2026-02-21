const express = require("express");
const router = express.Router();
const webinarController = require("../controllers/webinarController");

router.post("/", webinarController.createWebinar);
router.get("/active", webinarController.getActiveWebinar);
router.put("/:id", webinarController.updateWebinar);
router.delete("/:id", webinarController.deleteWebinar);

module.exports = router;