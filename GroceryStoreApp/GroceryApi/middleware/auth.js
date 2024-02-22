// middleware/auth.js

const jwt = require('jsonwebtoken');
const secretKey = 'YourSecretKey'; // Use an environment variable for this in a real application

function auth(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;