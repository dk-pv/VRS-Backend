const ContactMessage = require("../models/ContactMessage");

// CREATE
exports.createMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      australiaDuration,
      mortgageYears,
      baPreference,
      agree,
    } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name, Email and Phone are required",
      });
    }

    if (!agree) {
      return res.status(400).json({
        message: "You must agree to the policy",
      });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      australiaDuration,
      mortgageYears,
      baPreference,
      agree,
    });

    res.status(201).json({
      message: "Message submitted successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL (Admin)
exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({
      createdAt: -1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteMessage = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { returnDocument: "after" }
    );

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};