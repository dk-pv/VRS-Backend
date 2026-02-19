const PropertyShowcase = require("../models/PropertyShowcase");
const cloudinary = require("../config/cloudinary");

// GET
exports.getShowcase = async (req, res) => {
  try {
    const showcase = await PropertyShowcase.findOne();
    res.json(showcase || { images: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE / ADD IMAGES
exports.updateShowcase = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "property-showcase" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      uploadedImages.push(result.secure_url);
    }

    let showcase = await PropertyShowcase.findOne();

    if (!showcase) {
      showcase = await PropertyShowcase.create({
        images: uploadedImages,
      });
    } else {
      showcase.images = [...showcase.images, ...uploadedImages];
      await showcase.save();
    }

    res.json(showcase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
