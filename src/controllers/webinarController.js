const Webinar = require("../models/webinarModel");

/* ========================= */
/* CREATE WEBINAR */
/* ========================= */
exports.createWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.create(req.body);
    res.status(201).json(webinar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ========================= */
/* GET ACTIVE WEBINAR */
/* ========================= */
exports.getActiveWebinar = async (req, res) => {
  try {
    const webinars = await Webinar.find({ isActive: true }).sort({
      createdAt: -1,
    });

    if (!webinars.length) {
      return res.status(404).json({ message: "No webinars found" });
    }

    const now = new Date();

    const updatedWebinars = webinars.map((webinar) => {
      const startTime = new Date(webinar.date);
      const endTime = new Date(
        startTime.getTime() + webinar.durationMinutes * 60000
      );

      let status = "upcoming";

      if (now >= startTime && now <= endTime) {
        status = "live";
      } else if (now > endTime) {
        status = "ended";
      }

      return {
        ...webinar.toObject(),
        status,
      };
    });

    res.json(updatedWebinars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ========================= */
/* UPDATE WEBINAR */
/* ========================= */
exports.updateWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(webinar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ========================= */
/* DELETE WEBINAR */
/* ========================= */
exports.deleteWebinar = async (req, res) => {
  try {
    await Webinar.findByIdAndDelete(req.params.id);
    res.json({ message: "Webinar deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};