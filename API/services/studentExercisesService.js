// Database mockup
const homeworks = [
    {
        id: 0,
        description: 'Esimene kodutöö',
        dueDate: Date.now(),
        subjectId: 0,
        userId: 0
    },
    {
        id: 1,
        description: 'Teine kodutöö',
        dueDate: Date.now(),
        subjectId: 0,
        userId: 0
    }
  ];
  
  const homeworksService = {};
  
  homeworksService.read = () => {
    return homeworks;
  }
  
  
  homeworksService.readById = (id) => {
    return homeworks[id];
  }
  
  homeworksService.create = (homework) => {
    homework.id = homeworks.length,
    homeworks.push(homework);
    return homework;
  }
  
  homeworksService.update = (homework) => {
    // Check if optional data exists
    if (homework.description) {
      // Change user data in 'database'
      homeworks[homework.id].description = homework.description;
    }
    // Check if optional data exists
    if ((homework.subjectId || homework.subjectId === 0)) {
      // Change user data in 'database'
      homeworks[homework.id].subjectId = homework.subjectId;
    }
    return homeworks[homework.id];
  }
  
  homeworksService.delete = (id) => {
    homeworks.splice(id, 1);
    return true;
  }
  
  module.exports = homeworksService;