const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, unique: true, default: () => `user_${Date.now()}` },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, {strict: false});

// Pre-save middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Add a method to compare passwords at login time

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
