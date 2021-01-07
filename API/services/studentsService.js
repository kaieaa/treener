const hashService = require('./hashService');
const db = require('../../db');

studentsService = {};

studentsService.read = async () => {
  const users = await db.query(`SELECT id, firstName, lastName, phone, email FROM student`);
  console.log(users);
  return users;
}

// Return user by id
studentsService.readById = async (id) => {
  const users = await db.query(`SELECT id, firstName, lastName, phone, email FROM student WHERE id = ?`, [id]);
  return users[0];
}

// Create student
studentsService.create = async (student) => {
  student.password = await hashService.hash(student.password);
  // Add user to 'database'
  const result = await db.query(`INSERT INTO student SET ?`, [student]);
  if (result.affectedRows === 0) {
    return false;
  }
  return result.insertId;
}

studentsService.update = async (student) => {
  const studentToUpdate = studentsService.readById(student.id);
    // Check if optional data exists
    if (student.firstName) {
        // Change user data in 'database'
        studentToUpdate.firstName = student.firstName;
    }
    // Check if optional data exists
    if (student.lastName) {
        // Change user data in 'database'
        studentToUpdate.lastName = student.lastName;
    }
    // Check if optional data exists
    if (user.phone) {
      // Change user data in 'database'
      studentToUpdate.phone = student.phone;
    }
    // Check if optional data exists
    if (user.email) {
        // Change user data in 'database'
        studentToUpdate.email = student.email;
    }
    // Check if optional data exists
    if (user.password) {
        // Change user data in 'database'
        studentToUpdate.password = hashService.hash(student.password);
    }
    
    const result = await db.query(`UPDATE student SET ? WHERE id = ?`, [studentToUpdate, student.id]);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
}

studentsService.delete = async (id) => {
  const result = await db.query(`DELETE FROM student WHERE id = ?`, [id]);
  if (result.affectedRows === 0) {
    return false;
  }
  return true;
}

module.exports = studentsService;