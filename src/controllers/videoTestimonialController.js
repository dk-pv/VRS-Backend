const VideoTestimonial = require("../models/VideoTestimonial");
const cloudinary = require("../config/cloudinary");

// GET ALL
exports.getVideos = async (req, res) => {
  try {
    const videos = await VideoTestimonial.find().sort({
      createdAt: -1,
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
exports.createVideo = async (req, res) => {
  try {
    const { name, role, youtubeLink } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Thumbnail required" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "video-testimonials" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const video = await VideoTestimonial.create({
      name,
      role,
      thumbnail: result.secure_url,
      youtubeLink,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateVideo = async (req, res) => {
  try {
    const { name, role, youtubeLink } = req.body;

    let updateData = { name, role, youtubeLink };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "video-testimonials" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.thumbnail = result.secure_url;
    }

    const video = await VideoTestimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteVideo = async (req, res) => {
  try {
    await VideoTestimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
