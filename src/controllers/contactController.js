const ContactMessage = require("../models/ContactMessage");

// CREATE (User Side)
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await ContactMessage.create({
      name,
      email,
      message,
    });

    res.status(201).json(newMessage);
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

// MARK AS READ
exports.markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};