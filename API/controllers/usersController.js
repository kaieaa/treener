const usersService = require('../services/usersService');
const usersController = {};

// Endpoint for getting list of available users
// GET - users
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of users in response body
usersController.read = async (req, res) => {
    const users = await usersService.read();
    // Return list of users
    res.status(200).json({
        success: true,
        users: users
    });
}

// Endpoint for getting user specified by id
// GET - users
// Required: id
// Optional: none
// Returns: status 200 - OK and user data in response body
usersController.readById = async (req, res) => {
    const userId = req.params.id;
    if (userId) {
        const user = await usersService.readById(userId);
        // Return user with specified id
        res.status(200).json({
            success: true,
            user: user
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No id provided'
        });
    }
    
}

// Endpoint for creating new user
// POST - users
// Required values: firstName, lastName, email, password
// Optionalvalues: none
// Returns:
//  Success: status 201 - Created and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
usersController.create = (req, res) => {
    // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;

    // Check if required data exists
    if (firstName && lastName && email && password) {
        // Create new json with user data
        const user = {
            firstName,
            lastName,
            email,
            password
        };

        const newUser = usersService.create(user);
        // Return data
        res.status(201).json({
            success: true,
            user: newUser
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
// PUT - users
// Required: id
// Optional: firstName, lastName, email, password
// Returns:
//  Success: status 200 - OK and user data in response body
//  Fail: status 400 - Bad Request and error message in response body
usersController.update = (req, res) => {
    // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
    // Ternary operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    /* Same as:
    let id;
     if (typeof(req.body.id) === 'number') {
        id = req.body.id
     } else {
         id = false;
     }
     */
    // Check if required data exists
    if(id || id === 0) {
        const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
        const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
        const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
        const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 3 ? req.body.password : false;
        
        const user = {
            id,
            firstName,
            lastName,
            email,
            password
        };
    
        const updatedUser = usersService.update(user);
            // Return updated user data
            res.status(200).json({
                success: true,
                user: updatedUser
            });
    }  else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

// Endpoint for deleting user specified by id
// DELETE - users
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
usersController.delete = (req, res) => {
    // Check if required data exists
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        const result = usersService.delete(id);
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

module.exports = usersController;