const TeamMember = require("../models/Team");
const cloudinary = require("../config/cloudinary");

// GET ALL
exports.getTeam = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// CREATE
exports.createMember = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "team-members" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const member = await TeamMember.create({
      name,
      role,
      image: result.secure_url,
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateMember = async (req, res) => {
  try {
    const { name, role } = req.body;

    let updateData = { name, role };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "team-members" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.image = result.secure_url;
    }

    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
