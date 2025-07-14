const db = require("../database/db");

// Fetching User Data
exports.fetchUser = (req, res) => {
  const userId = req.userId;
  
  const fetchQuery = `SELECT name,email,username FROM users WHERE user_id = ?`;
  try {
    db.query(fetchQuery, [userId], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.length === 0) return res.status(404).json({ message: "User not found" });
      const user = result[0];

      res.status(200).json({ user });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editUser = (req,res)=>{
    const userId = req.userId;
    const {name,email,username} = req.body
    const checkQuery = `SELECT * FROM users 
    WHERE (email = ? OR username = ?) AND user_id != ?`
    db.query(checkQuery,[email,username,userId],(err,result)=>{
        if(err) return res.status(500).json({message : err.message})
        if(result.length > 0) return res.status(400).json({message : "Email or username already in use"})
    })
    const updateQuery = `UPDATE users SET name = ?,email = ?,username=?`
    db.query(updateQuery,[name,email,username],(err,result)=>{
        if(err) return res.status(500).json({message : err.message})
        return res.status(200).json({message : "User updated successfully"})
    })
}
