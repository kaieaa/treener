const db = require("../../db");

trainingplansService = {};

trainingplansService.read = async (users_ID) => {
  const trainingplans = await db.query(
    `SELECT * FROM trainingPlan tp 
    INNER JOIN student s ON s.ID = tp.student_ID 
    INNER JOIN users u ON u.ID = s.users_ID
    WHERE s.users_ID = ?`,
    [users_ID]
  );
  console.log(trainingplans);
  return trainingplans;
};

/* Igaks juhuks hoian alles:
trainingplansService.read = async () => {
  const users = await db.query(`SELECT * FROM trainingplan`);
  console.log(users);
  return users;
}*/

// Return trainingplan by id
trainingplansService.readById = async (id) => {
  const trainingplans = await db.query(
    `SELECT * FROM trainingplan WHERE id = ?`,
    [id]
  );
  return trainingplans[0];
};

// Return trainingplan by student_ID
trainingplansService.readByStudent = async (student_ID) => {
    const trainingplans = await db.query(
      `SELECT * FROM trainingplan WHERE student_ID = ?`,
      [student_ID]
    );
    return trainingplans[0];
  };

// Create trainingplan
trainingplansService.create = async (trainingplan) => {
  if (!trainingplan) return false;
  const result = await db.query(`INSERT INTO trainingplan SET ?`, [
    trainingplan,
  ]);
  if (result.affectedRows === 0) return false;
  return result.insertId;
};

// Updating doesn't work at the moment
trainingplansService.update = async (trainingplan) => {
  const trainingplanToUpdate = await trainingplansService.readById(
    trainingplan.id,
    trainingplan.users_id
  );
  if (!trainingplanToUpdate) return false;
  if (trainingplan.name) trainingplanToUpdate.name = trainingplan.name;
  if (trainingplan.users_id)
    trainingplanToUpdate.users_id = trainingplan.users_id;
  // Remove fields not related to trainingplan
  delete trainingplanToUpdate.firstName;
  delete trainingplanToUpdate.lastName;
  delete trainingplanToUpdate.email;
  delete trainingplanToUpdate.phone;
  const result = await db.query(
    `UPDATE trainingplan SET ? WHERE id = ? AND users_id = ?`,
    [trainingplanToUpdate, trainingplan.id, trainingplan.users_id]
  );
  if (result.affectedRows === 0) return false;
  return true;
};

trainingplansService.delete = async (id) => {
  const result = await db.query(`DELETE FROM trainingplan WHERE id = ?`, [id]);
  if (result.affectedRows === 0) {
    return false;
  }
  return result.deletedId;
};

module.exports = trainingplansService;
