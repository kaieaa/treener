const db = require('../../db');
const exercisesService = {};

/*exercisesService.read = async (users_id) => {
  if (!users_id) return false;
  const exercises = await db.query(`SELECT id FROM exercises WHERE users_id = ?`, [users_id]);
  return exercises;
}
*/

exercisesService.read = async () => {
  const exercises = await db.query(`SELECT id FROM exercises`);
  console.log(exercises);
  return exercises;
}

exercisesService.readById = async (id, users_id) => {
  const exercises = await db.query(`SELECT name FROM exercises WHERE id = ? AND users_id = ?`, [id, users_id]);
  if (exercises.length < 1 || exercises[0].users_id !== users_id) return false;
  return exercises[0];
}

exercisesService.create = async (exercise) => {
  if(!exercise) return false;
  const result = await db.query(`INSERT INTO exercises SET ?`, [exercise]);
  if (result.affectedRows === 0) return false;
  return result.insertId;
}

exercisesService.update = async (exercise) => {
  const exerciseToUpdate = await exercisesService.readById(exercise.id, exercise.users_id);
  if (!exerciseToUpdate) return false;
  if (exercise.name) exerciseToUpdate.name = exercise.name;
  if (exercise.users_id) exerciseToUpdate.users_id = exercise.users_id;
  // Remove fields not related to exercise (readById gives exercise with users data)
  delete exerciseToUpdate.firstName;
  delete exerciseToUpdate.lastName;
  delete exerciseToUpdate.email;
  const result = await db.query(`UPDATE exercises SET ? WHERE id = ? AND users_id = ?`, [exerciseToUpdate, exercise.id, exercise.users_id]);
  if (result.affectedRows === 0) return false;
  return true;
}

exercisesService.delete = async (id, users_id) => {
  const result = await db.query(`DELETE FROM exercises WHERE id = ? AND users_id = ?`, [id, users_id]);
  if (result.affectedRows === 0) return false;
  return true;
}

module.exports = exercisesService;