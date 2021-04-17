const db = require("../../db");
const exercisesService = {};

exercisesService.read = async (users_ID) => {
  if (!users_ID) return false;
  const exercises = await db.query(
    `SELECT * FROM exercises WHERE users_id = ?`,
    [users_ID]
  );
  return exercises;
};

exercisesService.readById = async (id, users_ID) => {
  const exercises = await db.query(
    `SELECT * FROM exercises WHERE id = ? AND users_ID = ?`,
    [id, users_ID]
  );
  //if (exercises.length < 1 || exercises[0].users_id !== users_id) return false;
  return exercises[0];
};

exercisesService.create = async (exercise) => {
  if (!exercise) return false;
  const result = await db.query(`INSERT INTO exercises SET ?`, [exercise]);
  if (result.affectedRows === 0) return false;
  return result.insertId;
};

exercisesService.delete = async (id) => {
  const result = await db.query(`DELETE FROM exercises WHERE id = ?`, [id]);
  if (result.affectedRows === 0) return false;
};

module.exports = exercisesService;
