const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized user.Token does not exist" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return res.status(500).json({ message: err })
    req.userId = decode.id 
    next()
  });
};

module.exports = verifyUser