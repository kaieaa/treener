const jwt = require('jsonwebtoken');
const config = require('../../config');
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.substring(7) : false;
    const verified = token ? await jwt.verify(token, config.jwtSecret) : false;
    console.log(verified.ID);
    if (verified) {
      req.user = verified.ID;
      next();
    } else {
        res.status(401).json({
        success: false,
        message: 'Invalid or missing token'
      });
    }

  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
}
  module.exports = isLoggedIn;
