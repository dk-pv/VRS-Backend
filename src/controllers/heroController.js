const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");

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
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Type required" });
    }

    if (type === "image") {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Images required" });
      }

      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            },
          );
          stream.end(file.buffer);
        });
      });

      const uploadedImages = await Promise.all(uploadPromises);

      const hero = await Hero.findOneAndUpdate(
        {},
        { type: "image", images: uploadedImages },
        { returnDocument: "after", upsert: true },
      );

      return res.json({ message: "Updated", hero });
    }

    if (type === "video") {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "Video required" });
      }

      const videoUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          },
        );
        stream.end(file.buffer);
      });

      const hero = await Hero.findOneAndUpdate(
        {},
        { type: "video", videoUrl, images: [] },
        { returnDocument: "after", upsert: true },
      );

      return res.json({ message: "Updated", hero });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
