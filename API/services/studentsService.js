const hashService = require('./hashService');
const db = require('../../db');

studentsService = {};

studentsService.read = async () => {
  const users = await db.query(`SELECT * FROM student`);
  console.log(users);
  return users;
}

// Return user by id
studentsService.readById = async (id) => {
  const users = await db.query(`SELECT * FROM student WHERE id = ?`, [id]);
  return users[0];
}

// Create student
studentsService.create = async (student) => {
  if(!student) return false;
  const result = await db.query(`INSERT INTO student SET ?`, [student]);
  if (result.affectedRows === 0) return false;
  return result.insertId;
}

studentsService.update = async (student) => {
  const studentToUpdate = await studentsService.readById(student.id, student.users_id);
  if (!studentToUpdate) return false;
  if (student.name) studentToUpdate.name = student.name;
  if (student.users_id) studentToUpdate.users_id = student.users_id;
  // Remove fields not related to student (readById gives student with users data)
  delete studentToUpdate.firstName;
  delete studentToUpdate.lastName;
  delete studentToUpdate.email;
  delete studentToUpdate.phone;
  const result = await db.query(`UPDATE student SET ? WHERE id = ? AND users_id = ?`, [studentToUpdate, student.id, student.users_id]);
  if (result.affectedRows === 0) return false;
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