const studentTrainingsService = require('../services/studentTrainingsService');

const studentTrainingsController = {};

// Endpoint for getting list of available studentTrainings
// GET - studentTrainings
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of studentTrainings in response body
studentTrainingsController.read = (req, res) => {
  const studentTrainings = studentTrainingsService.read();
  // Return list of studentTrainings
  res.status(200).json({
      success: true,
      studentTrainings
  });
}

// Endpoint for getting studentTraining specified by id
// GET - studentTrainings
// Required: id
// Optional: none
// Returns: status 200 - OK and studentTraining data in response body
studentTrainingsController.readById = (req, res) => {
  const id = req.params.id;
  const studentTraining = studentTrainingsService.readById(id);
  // Return studentTraining with specified id
  res.status(200).json({
      success: true,
      studentTraining
  });
}

// Endpoint for creating new studentTraining
// POST - studentTrainings
// Required values: description, dateAdded, exerciseId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and studentTraining data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentTrainingsController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;
  // Check if required data exists
  if (description && dateAdded && (exerciseId || exerciseId === 0) && (userId || userId === 0)) {
      // Create new json with user data
      const newstudentTraining = {
          description,
          dateAdded,
          exerciseId,
          userId
      };
      const studentTraining = studentTrainingsService.create(newstudentTraining);

      // Return data
      res.status(201).json({
          success: true,
          studentTraining
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating studentTraining specified by id
// PUT - studentTrainings
// Required: id
// Optional: description, dateAdded, exerciseId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentTrainingsController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const exerciseId = typeof(req.body.exerciseId) === 'number' ? req.body.exerciseId : false;
  // Check if required data exists
  if(id || id === 0) {
      const studentTraining = studentTrainingsService.update({ id, description, exerciseId });
      // Return updated user data
      res.status(200).json({
          success: true,
          studentTraining
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting studentTraining specified by id
// DELETE - studentTrainings
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
studentTrainingsController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = studentTrainingsService.delete(id);
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

module.exports = studentTrainingsController;