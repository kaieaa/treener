const hashService = require('./hashService');
const usersService = require('./usersService');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const authService = {};

authService.login = async (email, password) => {
  const user = await usersService.readByEmail(email);
  if (user) {
    const match = await hashService.compare(password, user.password);
    console.log(password);
    console.log(user.password);
    if (match) {
      // Generate token
      const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: 60 * 60 * 24 });
      console.log(token);
      return token;
    } else {
    //console.log(user);
      return false;
    }
  } else {
    return false;
  }
}

module.exports = authService;