const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const authController = {};

authController.getSession = async (req, res) => {
  const cookie = req.cookies?.trainerSessionCookie; // saa cookie küljest JWT kätte..
  const token = cookie.value; // ma ei tea kas toimib, ei saa proovida, topi debugger v logi välja vt mis tuleb
  if (!token) {
    res.status(200);
  } else {
    const user = await jwt.verify(token, config.jwtSecret);
    res.status(200).json(user);
  }
}

// Endpoint for logging in
// POST - login
// Required values: email, password
// Optional values: none
// Returns:
//  Success: status 200 and token - Logged in
//  Fail: status 401 - Not authorized
//  Fail: status 400 - Required field(s) missing or invalid
authController.login = async (req, res) => {
  const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
  const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;

  // Check if required data exists
  if (email && password) {
    const token = await authService.login(email, password);
    if (token) {
      const cookie = req.cookies.trainerSessionCookie;
    if (!cookie) {
      res.cookie('trainerSessionCookie',jwt, { maxAge: 900000, httpOnly: true });
    }
      next();
      // Return data
      res.status(200).json({
        success: true,
        token: token
      });
    } else {
      // Return error message
      res.status(401).json({
        success: false,
        message: 'Check Your credentials'
      });
    }
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

module.exports = authController;
