const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(403).json({ message: 'A token is required for authentication' });
  const token = tokenHeader.split(' ')[1];
  if (!token) return res.status(403).json({message : 'Token is not valid' });

  try {
    const decoded = jwt.verify(token,"JWT_SECRET_KEY_DOTENV");
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({message :"Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;
