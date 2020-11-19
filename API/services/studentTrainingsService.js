// Database mockup
const studentExercises = [
    {
        id: 0,
        description: 'Esimene kodutöö',
        dueDate: Date.now(),
        exerciseId: 0,
        studentId: 0
    },
    {
        id: 1,
        description: 'Teine kodutöö',
        dueDate: Date.now(),
        exerciseId: 0,
        studentId: 0
    }
  ];
  
  const studentExercisesService = {};
  
  studentExercisesService.read = () => {
    return studentExercises;
  }
  
  
  studentExercisesService.readById = (id) => {
    return studentExercises[id];
  }
  
  studentExercisesService.create = (studentExercise) => {
    studentExercise.id = studentExercises.length,
    studentExercises.push(studentExercise);
    return studentExercise;
  }
  
  studentExercisesService.update = (studentExercise) => {
    // Check if optional data exists
    if (studentExercise.description) {
      // Change user data in 'database'
      studentExercises[studentExercise.id].description = studentExercise.description;
    }
    // Check if optional data exists
    if ((studentExercise.exerciseId || studentExercise.exerciseId === 0)) {
      // Change user data in 'database'
      studentExercises[studentExercise.id].exerciseId = studentExercise.exerciseId;
    }
    return studentExercises[studentExercise.id];
  }
  
  studentExercisesService.delete = (id) => {
    studentExercises.splice(id, 1);
    return true;
  }
  
  module.exports = studentExercisesService;