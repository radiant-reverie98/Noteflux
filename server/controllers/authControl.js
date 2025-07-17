const User = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register Controller
exports.register = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, username, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000
    });

    return res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      
      path: "/",
      maxAge: 60 * 60 * 1000
    });

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // must match cookie settings
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  });
  res.status(200).json({ message: "Logged out successfully" });
};