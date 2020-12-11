// Database mockup
const students = [
    {
        id: 0,
        firstName: 'Kalle',
        lastName: 'Kuld',
        email: 'kalle.kuld@tlu.ee',
        userId: 0
    },
    {
        id: 1,
        firstName: 'Malle',
        lastName: 'Muld',
        email: 'malle.muld@tlu.ee',
        userId: 0
    },
  ];
  
  const studentsService = {
    read: () => {
      return students;
    },
    readById: (id) => {
      return students[id];
    },
    create: (student) => {
      student.id = students.length,
      // Add student to 'database'
      students.push(student);
  
      const studentToReturn = { ... student };
      delete password;
  
      return studentToReturn;
    },
    update: () => {
  
    },
    delete: (id) => {
      students.splice(id, 1);
      return true;
    }
  };
  
  
  module.exports = studentsService;