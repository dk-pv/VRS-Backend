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
/* GET ALL WEBINARS (LIMIT 3) */
/* ========================= */
exports.getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find()
      .sort({ createdAt: -1 }) // latest first

    if (!webinars.length) {
      return res.status(404).json({ message: "No webinars found" });
    }

    res.json(webinars);
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