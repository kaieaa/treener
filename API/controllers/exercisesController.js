const exercisesService = require('../services/exercisesService');
const exercisesController = {};

// Endpoint for getting list of available exercises
// GET - exercises
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of exercises in response body
exercisesController.read = (req, res) => {
  // Get list of exercises
  const exercises = exercisesService.read();
  // Return list of exercises
  res.status(200).json({
      success: true,
      exercises
  });
}

// Endpoint for getting exercise specified by id
// GET - exercises
// Required: id
// Optional: none
// Returns: status 200 - OK and exercise data in response body
exercisesController.readById = (req, res) => {
  const id = req.params.id;
  const exercise = exercisesService.readById(id);
  // Return exercise with specified id
  res.status(200).json({
      success: true,
      exercise
  });
}

// Endpoint for creating new exercise
// POST - exercises
// Required values: name, lecturerId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and lecturer data in response body
//  Fail: status 400 - Bad Request and error message in response body
exercisesController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
  const lecturerId = typeof(req.body.lecturerId) === 'number' ? req.body.lecturerId : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

  // Check if required data exists
  if (name && (lecturerId || lecturerId === 0) && (userId || userId === 0)) {
      // Create new json with user data
      const newexercise = {
          name,
          lecturerId,
          userId
      };
      const exercise = exercisesService.create(newexercise);
      // Return data
      res.status(201).json({
          success: true,
          exercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating exercises specified by id
// PUT - exercises
// Required: id
// Optional: name, lecturerId
// Returns:
//  Success: status 200 - OK and exercise data in response body
//  Fail: status 400 - Bad Request and error message in response body
exercisesController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
  const lecturerId = typeof(req.body.lecturerId) === 'number' ? req.body.lecturerId : false;
  // Check if required data exists
  if(id || id === 0) {
      const exercise = exercisesService.update({ id, name, lecturerId });
      // Return updated user data
      res.status(200).json({
          success: true,
          exercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting exercise specified by id
// DELETE - exercises
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
exercisesController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = exercisesService.delete(id);
      // Return success message
      res.status(200).json({
          success: deleted
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

module.exports = exercisesController;