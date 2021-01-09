const exercisesService = require('../services/exercisesService');
const exercisesController = {};

// Endpoint for getting list of available exercises
// GET - exercises
// Required values: userId
// Optional values: none
// Returns: status 200 - OK and list of exercises in response body
exercisesController.read = async (req, res) => {
  const userId = req.user;
  console.log(userId)
  //const userId = typeof(parseInt(req.params.userId)) === 'number' ? parseInt(req.params.userId) : false;
  if (userId) {
    // Get list of exercises
    const exercises = await exercisesService.read(userId);
    // Return list of exercises
    res.status(200).json({
        success: true,
        exercises
    });
  } else {
    res.status(400).json({
      success: false
  });
  }
}

/*exercisesController.read = async (req, res) => {
    //const userId = 2;
    const exercises = await exercisesService.read(userId);
    // Return list of users
    res.status(200).json({
        success: true,
        exercises: exercises
    });
}*/

// Endpoint for getting exercise specified by id
// GET - exercises
// Required: id
// Optional: none
// Returns: status 200 - OK and exercise data in response body
exercisesController.readById = async (req, res) => {
  const userId = req.user;
  const id = typeof(parseInt(req.params.id)) === 'number' ? parseInt(req.params.id) : false;
  if (id) {
    const exercise = await exercisesService.readById(id, userId);
    if (exercise) {
      // Return exercise with specified id
      res.status(200).json({
        success: true,
        exercise
      });
    } else {
      // Return error
      res.status(400).json({
        success: false,
        message: 'No exercise found'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Required field(s) missing or invalid'
  });
  }
}

// Endpoint for creating new exercise
// POST - exercises
// Required values: name, userId
// Optional values: desc, defaultSeries, defaultReps, defaultRepsType, defaultEquip, defaultWeight,
// video1, video2, comment,
// Returns:
//  Success: status 201 - Created and exercise data in response body
//  Fail: status 400 - Bad Request and error message in response body
exercisesController.create = async (req, res) => {
  // Check if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
  const desc = typeof(req.body.desc) === 'string' && req.body.desc.trim().length > 0 ? req.body.desc : false;
  const defaultSeries = typeof(req.body.defaultSeries) === 'number' ? req.body.defaultSeries : false;
  const defaultReps = typeof(req.body.defaultReps) === 'number' ? req.body.defaultReps : false;
  const defaultRepsType = typeof(req.body.defaultRepsType) === 'string' && req.body.defaultRepsType.trim().length > 0 ? req.body.defaultRepsType : false;
  const defaultEquip = typeof(req.body.defaultEquip) === 'string' && req.body.defaultEquip.trim().length > 0 ? req.body.defaultEquip : false;
  const defaultWeight = typeof(req.body.defaultWeight) === 'number' ? req.body.defaultWeight : false;
  const video1 = typeof(req.body.video1) === 'string' && req.body.video1.trim().length > 0 ? req.body.video1 : false;
  const video2 = typeof(req.body.video2) === 'string' && req.body.video2.trim().length > 0 ? req.body.video2 : false;
  const comment = typeof(req.body.comment) === 'string' && req.body.comment.trim().length > 0 ? req.body.comment : false;
  const userId = req.user;
  // Check if required data exists
  if (name && userId) {
      // Create new json with user data
      const exercise = {
          name: name,
          desc: desc,
          defaultSeries: defaultSeries,
          defaultReps: defaultReps,
          defaultRepsType: defaultRepsType,
          defaultEquip: defaultEquip,
          defaultWeight: defaultWeight,
          video1: video1,
          video2: video2,
          comment: comment,
          users_id: userId
      };
      const id = await exercisesService.create(exercise);
      // Return data
      if (id) {
        res.status(201).json({
            success: true,
            id
        });
      } else {
        res.status(500).json({
            success: false,
            message: 'Something went wrong while creating new exercise'
        });
      }
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for updating exercises specified by id
// PUT - exercises
// Required: id
// Optional: name, lecturerId
// Returns:
//  Success: status 200 - OK and exercise id
//  Fail: status 400 - Bad Request and error message in response body
exercisesController.update = async (req, res) => {
  // Next lines checking if provided data is expected type (typeof) and has length when whitespace is removed (.trim().length)
  const id = typeof(req.body.id) === 'number' ? req.body.id : false;
  const name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
  const desc = typeof(req.body.desc) === 'string' && req.body.desc.trim().length > 0 ? req.body.desc : false;
  const defaultSeries = typeof(req.body.defaultSeries) === 'number' ? req.body.defaultSeries : false;
  const defaultReps = typeof(req.body.defaultReps) === 'number' ? req.body.defaultReps : false;
  const defaultRepsType = typeof(req.body.defaultRepsType) === 'string' && req.body.defaultRepsType.trim().length > 0 ? req.body.defaultRepsType : false;
  const defaultEquip = typeof(req.body.defaultEquip) === 'string' && req.body.defaultEquip.trim().length > 0 ? req.body.defaultEquip : false;
  const defaultWeight = typeof(req.body.defaultWeight) === 'number' ? req.body.defaultWeight : false;
  const video1 = typeof(req.body.video1) === 'string' && req.body.video1.trim().length > 0 ? req.body.video1 : false;
  const video2 = typeof(req.body.video2) === 'string' && req.body.video2.trim().length > 0 ? req.body.video2 : false;
  const comment = typeof(req.body.comment) === 'string' && req.body.comment.trim().length > 0 ? req.body.comment : false;
  const userId = req.user;
  // Check if required data exists
  if(id && userId) {
      const exercise = {
          id,
          name,
          desc: desc,
          defaultSeries: defaultSeries,
          defaultReps: defaultReps,
          defaultRepsType: defaultRepsType,
          defaultEquip: defaultEquip,
          defaultWeight: defaultWeight,
          video1: video1,
          video2: video2,
          comment: comment,
          users_id: userId
      };
      const result = await exercisesService.update(exercise);
      // Return updated user data
      if (result) {
        res.status(200).json({
            success: result
        });
      } else {
        res.status(400).json({
            success: false,
            message: 'Exercise does not exists.'
        });
      }

  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

// Endpoint for deleting exercise specified by id
// DELETE - exercises
// Required: id
// Optional: none
// Returns:
//  Success: status 200 - OK and { success: true } message
//  Fail: status 400 - Bad Request and error message in response body
exercisesController.delete = async (req, res) => {
    const userId = 12;//req.user;
  // Check if required data exists
  const id = typeof(parseInt(req.body.id)) === 'number' ? parseInt(req.body.id) : false;
  if(id && userId) {
      const result = await exercisesService.delete(id, userId);
      if (result) {
        // Return success message
        res.status(200).json({
            success: result
        });
      } else {
        res.status(400).json({
            success: false,
            message: 'No exercise found.'
        });
      }

  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

module.exports = exercisesController;
