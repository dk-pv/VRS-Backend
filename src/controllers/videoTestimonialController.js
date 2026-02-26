const VideoTestimonial = require("../models/VideoTestimonial");

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

    if (!name || !role || !youtubeLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const video = await VideoTestimonial.create({
      name,
      role,
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

    const video = await VideoTestimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, youtubeLink },
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