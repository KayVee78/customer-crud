const jsonWebToken = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authorizeHeader = req.headers.authorization;
  if (!authorizeHeader) {
    return res.status(401).json({ error: "No token provided!" });
  }

  if (!authorizeHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format!" });
  }

  const token = authorizeHeader.slice(7);

  if (!token) {
    return res.status(401).json({ error: "Invalid token!" });
  }
  try {
    const decodedData = jsonWebToken.verify(token, process.env.SECRET_KEY);
    console.log(decodedData);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token!" });
  }
}
module.exports = verifyToken;
