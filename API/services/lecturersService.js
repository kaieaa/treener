// Database mockup
const lecturers = [
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
  
  const lecturersService = {
    read: () => {
      return lecturers;
    },
    readById: (id) => {
      return lecturers[id];
    },
    create: (lecturer) => {
      lecturer.id = lecturers.length,
      // Add lecturer to 'database'
      lecturers.push(lecturer);
  
      const lecturerToReturn = { ... lecturer };
      delete password;
  
      return lecturerToReturn;
    },
    update: () => {
  
    },
    delete: (id) => {
      lecturers.splice(id, 1);
      return true;
    }
  };
  
  
  module.exports = lecturersService;