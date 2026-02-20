const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactController");

router.post("/", controller.createMessage);
router.get("/", controller.getMessages);
router.delete("/:id", controller.deleteMessage);
router.put("/read/:id", controller.markAsRead);

module.exports = router;