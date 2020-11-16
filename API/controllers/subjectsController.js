const subjectsService = require('../services/subjectsService');
const subjectsController = {};

// Endpoint for getting list of available subjects
// GET - subjects
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of subjects in response body
subjectsController.read = (req, res) => {
  // Get list of subjects
  const subjects = subjectsService.read();
  // Return list of subjects
  res.status(200).json({
      success: true,
      subjects
  });
}

// Endpoint for getting subject specified by id
// GET - subjects
// Required: id
// Optional: none
// Returns: status 200 - OK and subject data in response body
subjectsController.readById = (req, res) => {
  const id = req.params.id;
  const subject = subjectsService.readById(id);
  // Return subject with specified id
  res.status(200).json({
      success: true,
      subject
  });
}

// Endpoint for creating new subject
// POST - subjects
// Required values: name, lecturerId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and lecturer data in response body
//  Fail: status 400 - Bad Request and error message in response body
subjectsController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
  const lecturerId = typeof(req.body.lecturerId) === 'number' ? req.body.lecturerId : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

  // Check if required data exists
  if (name && (lecturerId || lecturerId === 0) && (userId || userId === 0)) {
      // Create new json with user data
      const newSubject = {
          name,
          lecturerId,
          userId
      };
      const subject = subjectsService.create(newSubject);
      // Return data
      res.status(201).json({
          success: true,
          subject
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating subjects specified by id
// PUT - subjects
// Required: id
// Optional: name, lecturerId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
subjectsController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
  const lecturerId = typeof(req.body.lecturerId) === 'number' ? req.body.lecturerId : false;
  // Check if required data exists
  if(id || id === 0) {
      const subject = subjectsService.update({ id, name, lecturerId });
      // Return updated user data
      res.status(200).json({
          success: true,
          subject
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting subject specified by id
// DELETE - subjects
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
subjectsController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = subjectsService.delete(id);
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

module.exports = subjectsController;