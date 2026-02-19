const TextTestimonial = require("../models/TextTestimonial");

// GET ALL
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await TextTestimonial.find().sort({
      createdAt: -1,
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
exports.createTestimonial = async (req, res) => {
  try {
    const { name, location, text, rating } = req.body;

    const testimonial = await TextTestimonial.create({
      name,
      location,
      text,
      rating,
    });

    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await TextTestimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteTestimonial = async (req, res) => {
  try {
    await TextTestimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
