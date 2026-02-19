const SecuredProperty = require("../models/SecuredProperty");
const cloudinary = require("../config/cloudinary");

// CREATE
exports.createProperty = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "secured-properties" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    const property = await SecuredProperty.create({
      title,
      image: result.secure_url,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// GET ALL
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await SecuredProperty.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE

exports.updateProperty = async (req, res) => {
  try {
    const { title } = req.body;
    let updateData = { title };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "secured-properties" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.image = result.secure_url;
    }

    const property = await SecuredProperty.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteProperty = async (req, res) => {
  try {
    await SecuredProperty.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
