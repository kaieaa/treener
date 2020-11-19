const groupsExercisesService = require('../services/groupsExercisesService');

const groupsExercisesController = {};

// Endpoint for getting list of available groupsExercises
// GET - groupsExercises
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of groupsExercises in response body
groupsExercisesController.read = (req, res) => {
  const groupsExercises = groupsExercisesService.read();
  // Return list of groupsExercises
  res.status(200).json({
      success: true,
      groupsExercises
  });
}

// Endpoint for getting groupsExercise specified by id
// GET - groupsExercises
// Required: id
// Optional: none
// Returns: status 200 - OK and groupsExercise data in response body
groupsExercisesController.readById = (req, res) => {
  const id = req.params.id;
  const groupsExercise = groupsExercisesService.readById(id);
  // Return groupsExercise with specified id
  res.status(200).json({
      success: true,
      groupsExercise
  });
}

// Endpoint for creating new groupsExercise
// POST - groupsExercises
// Required values: description, dateAdded, exerciseId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and groupsExercise data in response body
//  Fail: status 400 - Bad Request and error message in response body
groupsExercisesController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;
  // Check if required data exists
  if (description && dateAdded && (exerciseId || exerciseId === 0) && (userId || userId === 0)) {
      // Create new json with user data
      const newgroupsExercise = {
          description,
          dateAdded,
          exerciseId,
          userId
      };
      const groupsExercise = groupsExercisesService.create(newgroupsExercise);

      // Return data
      res.status(201).json({
          success: true,
          groupsExercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating groupsExercise specified by id
// PUT - groupsExercises
// Required: id
// Optional: description, dateAdded, exerciseId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
groupsExercisesController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  // Check if required data exists
  if(id || id === 0) {
      const groupsExercise = groupsExercisesService.update({ id, description, exerciseId });
      // Return updated user data
      res.status(200).json({
          success: true,
          groupsExercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting groupsExercise specified by id
// DELETE - groupsExercises
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
groupsExercisesController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = groupsExercisesService.delete(id);
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

module.exports = groupsExercisesController;