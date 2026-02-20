const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogController");
const upload = require("../middleware/upload");

router.get("/", controller.getBlogs);
router.get("/:slug", controller.getBlogBySlug);
router.post("/", upload.single("image"), controller.createBlog);

module.exports = router;