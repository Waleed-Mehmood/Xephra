const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateToken = (user) => {
  return jwt.sign(
    {
      UserId: user.UserId,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        name: savedUser.name,
        UserId: savedUser.UserId,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const comparePassword = await user.comparePassword(password);
    if (!comparePassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        UserId: user.userId,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

  exports.forgot = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Email not found" });
      }

      const resetToken = crypto.randomBytes(20).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      const tokenExpiry = Date.now() + 15 * 60 * 1000;

      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: tokenExpiry,
          },
        }
      );

      // Create reset URL
      const resetUrl = `${req.protocol}://localhost:3000/reset/${resetToken}`;

      // send email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailoptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Xephra",
        text: `You are receiving this email because you requested a password reset. Click this link to reset your password: ${resetUrl}`,
      };

      await transporter.sendMail(mailoptions);
      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(500).json({ message: "Error sending password reset email." });
    }
  };

exports.reset = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  if (!newPassword) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password." });
  }
};
