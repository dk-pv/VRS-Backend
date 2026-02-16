const Hero = require("../models/Hero");

/**
 * @desc   Get Hero Section
 * @route  GET /api/hero
 */
exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();

    if (!hero) {
      return res.status(200).json({
        type: "image",
        images: [],
      });
    }

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Create or Update Hero Section
 * @route  PUT /api/hero
 */
exports.updateHero = async (req, res) => {
  try {
    const { type, videoUrl, images } = req.body;

    // Basic validation
    if (!type || (type !== "video" && type !== "image")) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (type === "video") {
      if (!videoUrl) {
        return res.status(400).json({ message: "Video URL required" });
      }
    }

    if (type === "image") {
      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ message: "At least one image required" });
      }

      if (images.length > 10) {
        return res.status(400).json({ message: "Max 10 images allowed" });
      }
    }

    let hero = await Hero.findOne();

    if (hero) {
      hero.type = type;
      hero.videoUrl = type === "video" ? videoUrl : "";
      hero.images = type === "image" ? images : [];
      await hero.save();
    } else {
      hero = await Hero.create({
        type,
        videoUrl: type === "video" ? videoUrl : "",
        images: type === "image" ? images : [],
      });
    }

    res.status(200).json({
      message: "Hero updated successfully",
      hero,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
