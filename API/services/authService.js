const hashService = require("./hashService");
const usersService = require("./usersService");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const authService = {};

authService.login = async (email, password) => {
  const user = await usersService.readByEmail(email);
  if (user) {
    const match = await hashService.compare(password, user.password);
    console.log('authService user.ID: ' + user.ID);
    if (match) {
      // Generate token
      const token = jwt.sign({ ID: user.ID }, config.jwtSecret, {
        expiresIn: 60 * 60 * 24,
      });
      console.log('authService token: ' + token);
      return token;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = authService;
