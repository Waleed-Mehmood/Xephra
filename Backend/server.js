// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config(); // Load environment variables
const path = require("path");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const upload = require("./config/multerConfig");


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const corsOptions = {
  // origin: "http://localhost:3000", 
  origin: "https://xephra.vercel.app", 
  methods: "GET,POST,PUT,DELETE,PATCH", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));



// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

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
