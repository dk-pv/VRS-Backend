const DiscoverVideo = require("../models/discoverVideo");
const cloudinary = require("../config/cloudinary");

// GET
exports.getVideo = async (req, res) => {
  try {
    const video = await DiscoverVideo.findOne();
    res.json(video || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE / CREATE
exports.updateVideo = async (req, res) => {
  try {
    const { videoUrl } = req.body;

    let thumbnailUrl;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "discover-video" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      thumbnailUrl = result.secure_url;
    }

    let video = await DiscoverVideo.findOne();

    if (!video) {
      video = await DiscoverVideo.create({
        thumbnail: thumbnailUrl,
        videoUrl,
      });
    } else {
      video.videoUrl = videoUrl;
      if (thumbnailUrl) video.thumbnail = thumbnailUrl;
      await video.save();
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
