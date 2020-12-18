const hashService = require('./hashService');
const db = require('../../db');

usersService = {};

usersService.read = async () => {
  const users = await db.query(`SELECT id, firstName, lastName, email FROM users`);
  console.log(users);
  return users;
}

// Return user by id
usersService.readById = async (id) => {
  const users = await db.query(`SELECT id, firstName, lastName, email FROM users WHERE id = ?`, [id]);
  return users[0];
}

// Create user
usersService.create = (user) => {
  user.id = users.length;
  // user.password = hashService.hash(user.password);
  // Add user to 'database'
  users.push(user);

  // Create new json from newUser for response
  const userToReturn = { ... user };
  // Remove password from user data
  // delete userToReturn.password;

  return userToReturn;
}

usersService.update = (user) => {
    // Check if optional data exists
    if (user.firstName) {
        // Change user data in 'database'
        users[user.id].firstName = user.firstName;
    }
    // Check if optional data exists
    if (user.lastName) {
        // Change user data in 'database'
        users[user.id].lastName = user.lastName;
    }
    // Check if optional data exists
    if (user.email) {
        // Change user data in 'database'
        users[user.id].email = user.email;
    }
    // Check if optional data exists
    if (user.password) {
        // Change user data in 'database'
        users[user.id].password = user.password;
    }

    const updatedUser = { ... users[user.id]};
    delete updatedUser.password;
    return updatedUser;
}

usersService.delete = (id) => {
  users.splice(id, 1);
  return true;
}

module.exports = usersService;