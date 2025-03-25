const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Authorization Header:", token);

  if (!token) {
    console.log("No token header");
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  console.log("Token:", token);

  if (!token) {
    console.log("Token not valid");
    return res.status(403).json({ message: 'Token is not valid' });
  }

  try {
    const decoded = jwt.verify(token, 'JWT_SECRET_KEY_DOTENV');
    console.log("Token decoded:", decoded);
    req.user = decoded;
  } catch (err) {
    console.log("Invalid token", err);
    return res.status(401).json({ message: 'Invalid Token' });
  }
  
  return next();
};

module.exports = verifyToken;
