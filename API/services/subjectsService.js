// Database mockup
const subjects = [
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
  
  const subjectsService = {};
  
  subjectsService.read = () => {
    return subjects;
  }
  
  subjectsService.readById = (id) => {
    return subjects[id];
  }
  
  subjectsService.create = (subject) => {
    subject.id = subjects.length;
    // Add lecturer to 'database'
    subjects.push(subject);
    return subject;
  }
  
  subjectsService.update = (subject) => {
    // Check if optional data exists
    if (subject.name) {
      // Change user data in 'database'
      subjects[subject.id].name = subject.name;
    }
    // Check if optional data exists
    if ((subject.lecturerId || subject.lecturerId === 0)) {
        // Change user data in 'database'
        subjects[subject.id].lecturerId = subject.lecturerId;
    }
    return subjects[subject.id];
  }
  
  subjectsService.delete = (id) => {
    subjects.splice(id, 1);
    return true;
  }
  
  module.exports = subjectsService;