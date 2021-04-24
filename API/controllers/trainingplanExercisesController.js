const trainingplanExercisesService = require('../services/trainingplanExercisesService');
const trainingplanExercisesController = {};

// Endpoint for getting list of available trainingplan per logged in userId
// GET - trainingplanExercises
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of trainingplanExercises in response body
trainingplanExercisesController.read = async (req, res) => {
    const users_ID = req.user;
    //const userId = typeof(parseInt(req.params.userId)) === 'number' ? parseInt(req.params.userId) : false;
    if (users_ID) {
      // Get list of trainingplanExercises
      const trainingplanExercises = await trainingplanExercisesService.read(users_ID);
      // Return list of trainingplanExercises
      res.status(200).json({
          success: true,
          trainingplanExercises
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'No id provided'
    });
    }
}

// Endpoint for getting user specified by id and logged in userId
// GET - trainingplanExercises
// Required: id, userId
// Optional: none
// Returns: status 200 - OK and user data in response body
trainingplanExercisesController.readById = async (req, res) => {
    const userId = req.user;
    const id = typeof(parseInt(req.params.id)) === 'number' ? parseInt(req.params.id) : false;
    if (id) {
        const trainingplan = await trainingplanExercisesService.readById(id, userId);
        // Return user with specified id
        res.status(200).json({
            success: true,
            trainingplan: trainingplan
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No id provided'
        });
    }
    
}

// Endpoint for getting user specified by id and logged in userId
// GET - trainingplanExercises
// Required: id, userId
// Optional: none
// Returns: status 200 - OK and user data in response body
trainingplanExercisesController.readByStudent = async (req, res) => {
    const student_ID = typeof(parseInt(req.params.student_ID)) === 'number' ? parseInt(req.params.student_ID) : false;
    //const id = typeof(parseInt(req.params.id)) === 'number' ? parseInt(req.params.id) : false;
    if (student_ID) {
        const trainingplanExercises = await trainingplanExercisesService.readById(student_ID);
        // Return trainingplan with specified student id
        res.status(200).json({
            success: true,
            trainingplanExercises
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No student_ID provided'
        });
    }
    
}

// Endpoint for creating new trainingplan
// POST - trainingplan
// Required values: student_ID
// Optionalvalues: name, date, comment
// Returns:
//  Success: status 201 - Created and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
trainingplanExercisesController.create = async (req, res) => {
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
    const date = typeof(req.body.date) === 'string' && req.body.date.trim().length > 0 ? req.body.date : false;
    const comment = typeof(req.body.comment) === 'string' && req.body.comment.trim().length > 0 ? req.body.comment : false;
    const student_ID = req.body.student_ID; //typeof(req.body.userId) === 'number' ? req.body.userId : false;
    // Check if required data exists
    if (student_ID) {
        // Create new json with user data
        const trainingplan = {
            name,
            date,
            comment,
            student_ID
        };

        const newTrainingplan = await trainingplanExercisesService.create(trainingplan);
        // Return data
        res.status(200).json({
            success: true,
            trainingplan: {...trainingplan, ID: newTrainingplan}
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
// PUT - trainingplanExercises
// Required: id
// Optional: firstName, lastName, email, phone
// Returns:
//  Success: status 200 - OK and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
trainingplanExercisesController.update = async (req, res) => {
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    // Check if required data exists
    if(id || id === 0) {
        const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
        const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
        const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
        const phone = typeof(req.body.phone) === 'string' && req.body.phone.trim().length > 3 ? req.body.phone : false;
        const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;

        const trainingplan = {
            id,
            firstName,
            lastName,
            email,
            phone,
            users_ID: userId
        };
    
        const updatedtrainingplan = await trainingplanExercisesService.update(trainingplan);
            // Return updated user data
            res.status(200).json({
                success: true,
                trainingplan: updatedtrainingplan
            });
    }  else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

// Endpoint for deleting trainingplanExercises specified by id
// DELETE - trainingplanExercises
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
trainingplanExercisesController.delete = async (req, res) => {
    // Check if required data exists
    //console.log('trainingplan req.params.id from front-end ' + req.params.id);
    const id = req.params.id
    //console.log('trainingplan id ' + id);
    if(id || id === 0) {
        const result = await trainingplanExercisesService.delete(id);
        // Return success message
        res.status(200).json({
            success: true,
            trainingplan: {...result, ID: result}
        });
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

module.exports = trainingplanExercisesController;