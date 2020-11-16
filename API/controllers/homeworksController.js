const homeworksService = require('../services/homeworksService');

const homeworksController = {};

// Endpoint for getting list of available homeworks
// GET - homeworks
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of homeworks in response body
homeworksController.read = (req, res) => {
  const homeworks = homeworksService.read();
  // Return list of homeworks
  res.status(200).json({
      success: true,
      homeworks
  });
}

// Endpoint for getting homework specified by id
// GET - homeworks
// Required: id
// Optional: none
// Returns: status 200 - OK and homework data in response body
homeworksController.readById = (req, res) => {
  const id = req.params.id;
  const homework = homeworksService.readById(id);
  // Return homework with specified id
  res.status(200).json({
      success: true,
      homework
  });
}

// Endpoint for creating new homework
// POST - homeworks
// Required values: description, dueDate, subjectId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and homework data in response body
//  Fail: status 400 - Bad Request and error message in response body
homeworksController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dueDate = new Date();
  const subjectId = typeof(req.body.subjectId) === 'number' ? req.body.subjectId : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;
  // Check if required data exists
  if (description && dueDate && (subjectId || subjectId === 0) && (userId || userId === 0)) {
      // Create new json with user data
      const newHomework = {
          description,
          dueDate,
          subjectId,
          userId
      };
      const homework = homeworksService.create(newHomework);

      // Return data
      res.status(201).json({
          success: true,
          homework
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating homework specified by id
// PUT - homeworks
// Required: id
// Optional: description, dueDate, subjectId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
homeworksController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dueDate = new Date();
  const subjectId = typeof(req.body.subjectId) === 'number' ? req.body.subjectId : false;
  // Check if required data exists
  if(id || id === 0) {
      const homework = homeworksService.update({ id, description, subjectId });
      // Return updated user data
      res.status(200).json({
          success: true,
          homework
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting homework specified by id
// DELETE - homeworks
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
homeworksController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = homeworksService.delete(id);
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

module.exports = homeworksController;