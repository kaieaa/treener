// Database mockup
const groupsExercises = [
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
  
  const groupsExercisesService = {};
  
  groupsExercisesService.read = () => {
    return groupsExercises;
  }
  
  
  groupsExercisesService.readById = (id) => {
    return groupsExercises[id];
  }
  
  groupsExercisesService.create = (groupsExercise) => {
    groupsExercise.id = groupsExercises.length,
    groupsExercises.push(groupsExercise);
    return groupsExercise;
  }
  
  groupsExercisesService.update = (groupsExercise) => {
    // Check if optional data exists
    if (groupsExercise.description) {
      // Change user data in 'database'
      groupsExercises[groupsExercise.id].description = groupsExercise.description;
    }
    // Check if optional data exists
    if ((groupsExercise.exerciseId || groupsExercise.exerciseId === 0)) {
      // Change user data in 'database'
      groupsExercises[groupsExercise.id].exerciseId = groupsExercise.exerciseId;
    }
    return groupsExercises[groupsExercise.id];
  }
  
  groupsExercisesService.delete = (id) => {
    groupsExercises.splice(id, 1);
    return true;
  }
  
  module.exports = groupsExercisesService;