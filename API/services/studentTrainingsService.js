// Database mockup
const studentTrainings = [
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
  
  const studentTrainingsService = {};
  
  studentTrainingsService.read = () => {
    return studentTrainings;
  }
  
  
  studentTrainingsService.readById = (id) => {
    return studentTrainings[id];
  }
  
  studentTrainingsService.create = (studentTraining) => {
    studentTraining.id = studentTrainings.length,
    studentTrainings.push(studentTraining);
    return studentTraining;
  }
  
  studentTrainingsService.update = (studentTraining) => {
    // Check if optional data exists
    if (studentTraining.description) {
      // Change user data in 'database'
      studentTrainings[studentTraining.id].description = studentTraining.description;
    }
    // Check if optional data exists
    if ((studentTraining.exerciseId || studentTraining.exerciseId === 0)) {
      // Change user data in 'database'
      studentTrainings[studentTraining.id].exerciseId = studentTraining.exerciseId;
    }
    return studentTrainings[studentTraining.id];
  }
  
  studentTrainingsService.delete = (id) => {
    studentTrainings.splice(id, 1);
    return true;
  }
  
  module.exports = studentTrainingsService;