const notesService = require('../services/notesService');

const notesController = {};

// Endpoint for getting list of available notes
// GET - notes
// Required values: none
// Optional values: none
// Returns: status 200 - OK and list of notes in response body
notesController.read = (req, res) => {
  const notes = notesService.read();
  // Return list of notes
  res.status(200).json({
      success: true,
      notes
  });
}

// Endpoint for getting note specified by id
// GET - notes
// Required: id
// Optional: none
// Returns: status 200 - OK and note data in response body
notesController.readById = (req, res) => {
  const id = req.params.id;
  const note = notesService.readById(id);
  // Return note with specified id
  res.status(200).json({
      success: true,
      note
  });
}

// Endpoint for creating new note
// POST - notes
// Required values: description, dateAdded, studentTrainingId, userId
// Optional values: none
// Returns:
//  Success: status 201 - Created and note data in response body
//  Fail: status 400 - Bad Request and error message in response body
notesController.create = (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const studentTrainingId = typeof(req.body.studentTrainingId) === 'number' ? req.body.studentTrainingId : false;
  const userId = typeof(req.body.userId) === 'number' ? req.body.userId : false;
  // Check if required data exists
  if (description && dateAdded && (studentTrainingId || studentTrainingId === 0) && (userId || userId === 0)) {
      // Create new json with user data
      const newnote = {
          description,
          dateAdded,
          studentTrainingId,
          userId
      };
      const note = notesService.create(newnote);

      // Return data
      res.status(201).json({
          success: true,
          note
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating note specified by id
// PUT - notes
// Required: id
// Optional: description, dateAdded, studentTrainingId
// Returns:
//  Success: status 200 - OK and subject data in response body
//  Fail: status 400 - Bad Request and error message in response body
notesController.update = (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const description = typeof(req.body.description) === 'string' && req.body.description.trim().length > 0 ? req.body.description : false;
  const dateAdded = new Date();
  const studentTrainingId = typeof(req.body.studentTrainingId) === 'number' ? req.body.studentTrainingId : false;
  // Check if required data exists
  if(id || id === 0) {
      const note = notesService.update({ id, description, studentTrainingId });
      // Return updated user data
      res.status(200).json({
          success: true,
          note
      });
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting note specified by id
// DELETE - notes
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
notesController.delete = (req, res) => {
  // Check if required data exists
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  if(id || id === 0) {
      const deleted = notesService.delete(id);
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

module.exports = notesController;