const Blog = require("../models/Blog");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");

// GET ALL
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
  res.json(blogs);
};

// GET SINGLE BY SLUG
exports.getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, metaTitle, metaDescription } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blogs" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      image: result.secure_url,
      metaTitle,
      metaDescription,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};