const express = require("express");
const router = express.Router();
const controller = require("../controllers/teamController");
const upload = require("../middleware/upload");

router.get("/", controller.getTeam);
router.post("/", upload.single("image"), controller.createMember);
router.put("/:id", upload.single("image"), controller.updateMember);
router.delete("/:id", controller.deleteMember);

module.exports = router;
