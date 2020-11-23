// Database mockup
const groupExercises = [
    {
        id: 0,
        dateAdded: Date.now(),
        exerciseId: 0,
        groupId: 0
    },
    {
        id: 1,
        dateAdded: Date.now(),
        exerciseId: 0,
        groupId: 0
    }
  ];
  
  const groupExercisesService = {};
  
  groupExercisesService.read = () => {
    return groupExercises;
  }
  
  
  groupExercisesService.readById = (id) => {
    return groupExercises[id];
  }
  
  groupExercisesService.create = (groupExercise) => {
    groupExercise.id = groupExercises.length,
    groupExercises.push(groupExercise);
    return groupExercise;
  }
  
  groupExercisesService.update = (groupExercise) => {
    // Check if optional data exists
    if (groupExercise.groupId) {
      // Change user data in 'database'
      groupExercises[groupExercise.id].groupId = groupExercise.groupId;
    }
    // Check if optional data exists
    if ((groupExercise.exerciseId || groupExercise.exerciseId === 0)) {
      // Change user data in 'database'
      groupExercises[groupExercise.id].exerciseId = groupExercise.exerciseId;
    }
    return groupExercises[groupExercise.id];
  }
  
  groupExercisesService.delete = (id) => {
    groupExercises.splice(id, 1);
    return true;
  }
  
  module.exports = groupExercisesService;