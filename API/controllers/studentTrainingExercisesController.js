const studentTrainingExercisesService = require('../services/studentTrainingExercisesService');

const studentTrainingExercisesController = {};

// Endpoint for getting list of available studentTrainingExercises
// GET - studentTrainingExercises
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of studentTrainingExercises in response body
studentTrainingExercisesController.read = (req, res) => {
  const studentTrainingExercises = studentTrainingExercisesService.read();
  // Return list of studentTrainingExercises
  res.status(200).json({
      success: true,
      studentTrainingExercises
  });
}

// Endpoint for getting studentTrainingExercise specified by id
// GET - studentTrainingExercises
// Required: id
// Optional: none
// Returns: status 200 - OK and studentTrainingExercise data in response body
studentTrainingExercisesController.readById = (req, res) => {
  const id = req.params.id;
  const studentTrainingExercise = studentTrainingExercisesService.readById(id);
  // Return studentTrainingExercise with specified id
  res.status(200).json({
      success: true,
      studentTrainingExercise
  });
}

// Endpoint for creating new studentTrainingExercise
// POST - studentTrainingExercises
// Required values: description, dateAdded, exerciseId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and studentTrainingExercise data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentTrainingExercisesController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;
  // Check if required data exists
  if (description && dateAdded && (exerciseId || exerciseId === 0) && (userId || userId === 0)) {
      // Create new json with user data
      const newstudentTrainingExercise = {
          description,
          dateAdded,
          exerciseId,
          userId
      };
      const studentTrainingExercise = studentTrainingExercisesService.create(newstudentTrainingExercise);

      // Return data
      res.status(201).json({
          success: true,
          studentTrainingExercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating studentTrainingExercise specified by id
// PUT - studentTrainingExercises
// Required: id
// Optional: description, dateAdded, exerciseId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentTrainingExercisesController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  // Check if required data exists
  if(id || id === 0) {
      const studentTrainingExercise = studentTrainingExercisesService.update({ id, description, exerciseId });
      // Return updated user data
      res.status(200).json({
          success: true,
          studentTrainingExercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting studentTrainingExercise specified by id
// DELETE - studentTrainingExercises
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
studentTrainingExercisesController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = studentTrainingExercisesService.delete(id);
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

module.exports = studentTrainingExercisesController;