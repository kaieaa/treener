// Database mockup
const studentTrainingExercises = [
    {
        id: 0,
        description: 'Esimene kodutöö',
        dateAdded: Date.now(),
        exerciseId: 0,
        studentId: 0
    },
    {
        id: 1,
        description: 'Teine kodutöö',
        dateAdded: Date.now(),
        exerciseId: 0,
        studentId: 0
    }
  ];
  
  const studentTrainingExercisesService = {};
  
  studentTrainingExercisesService.read = () => {
    return studentTrainingExercises;
  }
  
  
  studentTrainingExercisesService.readById = (id) => {
    return studentTrainingExercises[id];
  }
  
  studentTrainingExercisesService.create = (studentTrainingExercise) => {
    studentTrainingExercise.id = studentTrainingExercises.length,
    studentTrainingExercises.push(studentTrainingExercise);
    return studentTrainingExercise;
  }
  
  studentTrainingExercisesService.update = (studentTrainingExercise) => {
    // Check if optional data exists
    if (studentTrainingExercise.description) {
      // Change user data in 'database'
      studentTrainingExercises[studentTrainingExercise.id].description = studentTrainingExercise.description;
    }
    // Check if optional data exists
    if ((studentTrainingExercise.exerciseId || studentTrainingExercise.exerciseId === 0)) {
      // Change user data in 'database'
      studentTrainingExercises[studentTrainingExercise.id].exerciseId = studentTrainingExercise.exerciseId;
    }
    return studentTrainingExercises[studentTrainingExercise.id];
  }
  
  studentTrainingExercisesService.delete = (id) => {
    studentTrainingExercises.splice(id, 1);
    return true;
  }
  
  module.exports = studentTrainingExercisesService;