const express = require("express");
const router = express.Router();
const controller = require("../controllers/discoverVideoController");
const upload = require("../middleware/upload");

router.get("/", controller.getVideo);
router.put("/", upload.single("thumbnail"), controller.updateVideo);

module.exports = router;
