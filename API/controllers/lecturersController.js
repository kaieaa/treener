const lecturersService = require('../services/lecturersService');
const lectrurersService = require('../services/lecturersService');

const lecturersController = {};

// Endpoint for getting list of available lecturers
// GET - lecturers
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of lecturers in response body
lecturersController.read = (req, res) => {
  // Get list of lecturers
  const lecturers = lectrurersService.read();
  // Return list of lecturers
  res.status(200).json({
      success: true,
      lecturers
  });
};

// Endpoint for getting lecturer specified by id
// GET - lecturers
// Required: id
// Optional: none
// Returns: status 200 - OK and lecturer data in response body
lecturersController.readById = (req, res) => {
  const id = req.params.id;
  // Get lecturer from service
  const lecturer = lecturersService.readById(id);
  // Return lecturer
  res.status(200).json({
      success: true,
      lecturer
  });
};

// Endpoint for creating new lecturer
// POST - lecturers
// Required values: firstName, lastName, email
// Optional values: none
// Returns:
//  Success: status 201 - Created and lecturer data in response body
//  Fail: status 400 - Bad Request and error message in response body
lecturersController.create =(req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
  const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
  const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

  // Check if required data exists
  if (firstName && lastName && email && (userId || userId === 0)) {
      // Create new json with user data
      const newLecturer = {
          firstName,
          lastName,
          email,
          userId
      };
      
      const lecturer = lectrurersService.create(newLecturer);
      // Return data
      res.status(201).json({
          success: true,
          lecturer
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
};

// Endpoint for updating lecturer specified by id
// PUT - lecturers
// Required: id
// Optional: firstName, lastName, email
// Returns:
//  Success: status 200 - OK and lecturer data in response body
//  Fail: status 400 - Bad Request and error message in response body
lecturersController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
  const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
  const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
  // Check if required data exists
  if(id || id === 0) {
      // Check if optional data exists
      if (firstName) {
          // Change user data in 'database'
          lecturers[id].firstName = firstName;
      }
      // Check if optional data exists
      if (lastName) {
          // Change user data in 'database'
          lecturers[id].lastName = lastName;
      }
      // Check if optional data exists
      if (email) {
          // Change user data in 'database'
          lecturers[id].email = email;
      }
      // Return updated user data
      res.status(200).json({
          success: true,
          lecturer: lecturers[id]
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
};

// Endpoint for deleting lecturer specified by id
// DELETE - lecturers
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
lecturersController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = lectrurersService.delete(id);
      // Return success message
      res.status(200).json({
          success: true
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
};

module.exports = lecturersController;