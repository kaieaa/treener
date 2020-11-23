const groupExercisesService = require('../services/groupExercisesService');

const groupExercisesController = {};

// Endpoint for getting list of available groupExercises
// GET - groupExercises
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of groupExercises in response body
groupExercisesController.read = (req, res) => {
  const groupExercises = groupExercisesService.read();
  // Return list of groupExercises
  res.status(200).json({
      success: true,
      groupExercises
  });
}

// Endpoint for getting groupExercise specified by id
// GET - groupExercises
// Required: id
// Optional: none
// Returns: status 200 - OK and groupExercise data in response body
groupExercisesController.readById = (req, res) => {
  const id = req.params.id;
  const groupExercise = groupExercisesService.readById(id);
  // Return groupExercise with specified id
  res.status(200).json({
      success: true,
      groupExercise
  });
}

// Endpoint for creating new groupExercise
// POST - groupExercises
// Required values: description, dateAdded, exerciseId, groupId
// Optional values: none
// Returns:
//  Success: status 201 - Created and groupExercise data in response body
//  Fail: status 400 - Bad Request and error message in response body
groupExercisesController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const dateAdded = new Date();
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  const groupId = typeof(req.body.groupId) === 'number' ? req.body.groupId : false;
  // Check if required data exists
  if (dateAdded && (exerciseId || exerciseId === 0) && (groupId || groupId === 0)) {
      // Create new json with user data
      const newgroupExercise = {
          dateAdded,
          exerciseId,
          groupId
      };
      const groupExercise = groupExercisesService.create(newgroupExercise);

      // Return data
      res.status(201).json({
          success: true,
          groupExercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating groupExercise specified by id
// PUT - groupExercises
// Required: id
// Optional: description, dateAdded, exerciseId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
groupExercisesController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const groupId = typeof(req.body.groupId) === 'number' ? req.body.groupId : false;  
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  // Check if required data exists
  if(id || id === 0) {
      const groupExercise = groupExercisesService.update({ id, groupId, exerciseId });
      // Return updated user data
      res.status(200).json({
          success: true,
          groupExercise
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting groupExercise specified by id
// DELETE - groupExercises
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
groupExercisesController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = groupExercisesService.delete(id);
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

module.exports = groupExercisesController;