const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const settingsRoutes = require("./routes/settingsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/settings", settingsRoutes);

module.exports = app;
