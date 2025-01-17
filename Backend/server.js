// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config(); // Load environment variables
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const upload = require("./config/multerConfig");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Only allow frontend on port 3000
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// Connect to MongoDB
connectDB();

// Sample route
app.get("/", (req, res) => {
  res.send("Game Events API");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
