const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Controller for user registration
exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  const checkQuery = `SELECT * FROM users WHERE username = ?`;
  db.query(checkQuery, [username], async (err, result) => {
    if (err) return res.status(500).json("Server error: ", err);
    else if (result.length > 0)
      return res.status(400).json({ message: "Username already exists" });
  });

  // Password Hashing
  try {
    saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = `INSERT INTO users (email,username,password) VALUES (?,?,?) `;
    db.query(insertQuery, [email, username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: err });
      const userId = result.insertId;

      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
      });

      res
        .status(201)
        .json({ message: "User registered successfully", token: token });
    });
  } catch (err) {
    res.status(500).json({ message: "Password hashing failed" });
  }
};

// Controller for user login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const query = `SELECT * FROM users WHERE username = ?`;
  db.query(query, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User does not exist" });
    const user = result[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
      });

      res.status(201).json({ message: "Login successfull", token: token });
    } catch (err) {
        return res.status(500).json({message : err})
    }
  });
};

// Controller for logout

exports.logout = (req,res)=>{
    res.clearCookie('token',{
        httpOnly : true,
        secure : false,
        sameSite : "strict",
    })
    res.status(200).json({message: "Logged out successfully"})
}