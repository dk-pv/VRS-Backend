const express = require("express");
const router = express.Router();
const controller = require("../controllers/propertyShowcaseController");
const upload = require("../middleware/upload");

router.get("/", controller.getShowcase);
router.put("/", upload.array("images"), controller.updateShowcase);

module.exports = router;
