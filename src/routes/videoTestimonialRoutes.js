const express = require("express");
const router = express.Router();
const controller = require("../controllers/videoTestimonialController");
const upload = require("../middleware/upload");

router.get("/", controller.getVideos);
router.post("/", upload.single("thumbnail"), controller.createVideo);
router.put("/:id", upload.single("thumbnail"), controller.updateVideo);
router.delete("/:id", controller.deleteVideo);

module.exports = router;
