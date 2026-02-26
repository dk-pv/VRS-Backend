const express = require("express");
const router = express.Router();
const controller = require("../controllers/videoTestimonialController");


router.get("/", controller.getVideos);
router.post("/",controller.createVideo);
router.put("/:id",  controller.updateVideo);
router.delete("/:id", controller.deleteVideo);

module.exports = router;
