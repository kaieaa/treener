const studentsService = require('../services/studentsService');

const studentsController = {};

// Endpoint for getting list of available students
// GET - students
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of students in response body
studentsController.read = (req, res) => {
  // Get list of students
  const students = studentsService.read();
  // Return list of students
  res.status(200).json({
      success: true,
      students
  });
};

// Endpoint for getting student specified by id
// GET - students
// Required: id
// Optional: none
// Returns: status 200 - OK and student data in response body
studentsController.readById = (req, res) => {
  const id = req.params.id;
  // Get student from service
  const student = studentsService.readById(id);
  // Return student
  res.status(200).json({
      success: true,
      student
  });
};

// Endpoint for creating new student
// POST - students
// Required values: firstName, lastName, email
// Optional values: none
// Returns:
//  Success: status 201 - Created and student data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentsController.create =(req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
  const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
  const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

  // Check if required data exists
  if (firstName && lastName && email && (userId || userId === 0)) {
      // Create new json with user data
      const newstudent = {
          firstName,
          lastName,
          email,
          userId
      };
      
      const student = studentsService.create(newstudent);
      // Return data
      res.status(201).json({
          success: true,
          student
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
};

// Endpoint for updating student specified by id
// PUT - students
// Required: id
// Optional: firstName, lastName, email
// Returns:
//  Success: status 200 - OK and student data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentsController.update = (req, res) => {
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
          students[id].firstName = firstName;
      }
      // Check if optional data exists
      if (lastName) {
          // Change user data in 'database'
          students[id].lastName = lastName;
      }
      // Check if optional data exists
      if (email) {
          // Change user data in 'database'
          students[id].email = email;
      }
      // Return updated user data
      res.status(200).json({
          success: true,
          student: students[id]
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
};

// Endpoint for deleting student specified by id
// DELETE - students
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
studentsController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = studentsService.delete(id);
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

module.exports = studentsController;