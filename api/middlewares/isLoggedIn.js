const jwt = require('jsonwebtoken');
const config = require('../../config');
/*const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.substring(7) : false;
    const verified = token ? await jwt.verify(token, config.jwtSecret) : false;
    console.log(verified);
    if (verified) {
      req.user = verified.id;
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
}*/

const isLoggedIn = async (req, res, next) => {
    try {
      // Kontrollime kas token on headeris olemas
      const token = req.headers.authorization.substring(7);
      // Kontrollime kas token on valiidne
      const verified = jwt.verify(token, config.jwtSecret);
      console.log(verified);
      if (verified) {
        // Kirjutame tokeni payloadis oleva id request objekti sisse
        req.user = verified.email
        // Anname tegevuse üle järgmisele middlewarele (kontrollerile)
        next();
      }
    } catch (error) {
      // Lõpetame vea puhul request-response tsükli ja saadame kliendile veateate
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  }
  module.exports = isLoggedIn;
