const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const heroRoutes = require("./routes/heroRoutes");
const securedPropertyRoutes = require("./routes/securedPropertyRoutes");
const propertyShowcaseRoutes = require("./routes/propertyShowcaseRoutes");
const discoverVideoRoutes = require("./routes/discoverVideoRoutes");
const teamRoutes = require("./routes/teamRoutes");
const textTestimonialRoutes = require("./routes/textTestimonialRoutes");
const videoTestimonialRoutes = require("./routes/videoTestimonialRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");




const app = express();

const allowedOrigins = [
  process.env.USER_FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/secured-properties", securedPropertyRoutes);
app.use("/api/property-showcase", propertyShowcaseRoutes);
app.use("/api/discover-video", discoverVideoRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/text-testimonials", textTestimonialRoutes);
app.use("/api/video-testimonials", videoTestimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);

module.exports = app;
