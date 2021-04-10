const studentsService = require('../services/studentsService');
const studentsController = {};

// Endpoint for getting list of available student per logged in userId
// GET - students
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of users in response body
studentsController.read = async (req, res) => {
    const userId = req.user;
    //const userId = typeof(parseInt(req.params.userId)) === 'number' ? parseInt(req.params.userId) : false;
    if (userId) {
      // Get list of students
      const students = await studentsService.read(userId);
      // Return list of students
      res.status(200).json({
          success: true,
          students
      });
    } else {
      res.status(400).json({
        success: false
    });
    }
}

// Endpoint for getting user specified by id and logged in userId
// GET - students
// Required: id, userId
// Optional: none
// Returns: status 200 - OK and user data in response body
studentsController.readById = async (req, res) => {
    const userId = req.user;
    const id = typeof(parseInt(req.params.id)) === 'number' ? parseInt(req.params.id) : false;
    if (id) {
        const student = await studentsService.readById(id, userId);
        // Return user with specified id
        res.status(200).json({
            success: true,
            student: student
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No id provided'
        });
    }
    
}

// Endpoint for creating new student
// POST - student
// Required values: firstName, lastName, email, phone, userId
// Optionalvalues: none
// Returns:
//  Success: status 201 - Created and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentsController.create = async (req, res) => {
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const phone = typeof(req.body.phone) === 'string' && req.body.phone.trim().length > 2 ? req.body.phone : false;
    const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;
    // Check if required data exists
    if (firstName && lastName && email && phone) {
        // Create new json with user data
        const student = {
            firstName,
            lastName,
            email,
            phone,
            users_id: userId
        };

        const newStudent = await studentsService.create(student);
        // Return data
        res.status(201).json({
            success: true,
            student: newStudent
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

// Endpoint for updating user specified by id
// PUT - students
// Required: id
// Optional: firstName, lastName, email, phone
// Returns:
//  Success: status 200 - OK and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
studentsController.update = async (req, res) => {
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    // Check if required data exists
    if(id || id === 0) {
        const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
        const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
        const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
        const phone = typeof(req.body.phone) === 'string' && req.body.phone.trim().length > 3 ? req.body.phone : false;
        const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

        const student = {
            id,
            firstName,
            lastName,
            email,
            phone,
            users_id: userId
        };
    
        const updatedStudent = await studentsService.update(student);
            // Return updated user data
            res.status(200).json({
                success: true,
                student: updatedStudent
            });
    }  else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

// Endpoint for deleting students specified by id
// DELETE - students
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
studentsController.delete = async (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        const result = await studentsService.delete(id);
        // Return success message
        res.status(200).json({
            success: result
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

module.exports = studentsController;