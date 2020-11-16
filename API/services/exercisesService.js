// Database mockup
const exercises = [
    {
        id: 0,
        name: 'Riistvara ja operatsioonisüsteemide alused',
        lecturerId: 0,
        userId: 0
    },
    {
        id: 1,
        name: 'Programmeerimine II',
        lecturerId: 0,
        userId: 0
    }
  ];
  
  const exercisesService = {};
  
  exercisesService.read = () => {
    return exercises;
  }
  
  exercisesService.readById = (id) => {
    return exercises[id];
  }
  
  exercisesService.create = (exercise) => {
    exercise.id = exercises.length;
    // Add lecturer to 'database'
    exercises.push(exercise);
    return exercise;
  }
  
  exercisesService.update = (exercise) => {
    // Check if optional data exists
    if (exercise.name) {
      // Change user data in 'database'
      exercises[exercise.id].name = exercise.name;
    }
    // Check if optional data exists
    if ((exercise.lecturerId || exercise.lecturerId === 0)) {
        // Change user data in 'database'
        exercises[exercise.id].lecturerId = exercise.lecturerId;
    }
    return exercises[exercise.id];
  }
  
  exercisesService.delete = (id) => {
    exercises.splice(id, 1);
    return true;
  }
  
  module.exports = exercisesService;