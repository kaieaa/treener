// Database mockup
const notes = [
    {
        id: 0,
        name: 'Trenni märkmed 15.nov',
        description: '',
        dateAdded: Date.now(),
        studentTrainingId: 0,
        studentId: 0
    },
    {
        id: 1,
        name: 'Trenni märkmed 17.nov',
        description: 'Vastupidavuse osas suur areng võrreldes eelmise trenniga',
        dateAdded: Date.now(),
        studentTrainingId: 1,
        studentId: 0
    }
  ];
  
  const notesService = {};
  
  notesService.read = () => {
    return notes;
  }
  
  
  notesService.readById = (id) => {
    return notes[id];
  }
  
  notesService.create = (note) => {
    note.id = notes.length,
    notes.push(note);
    return note;
  }
  
  notesService.update = (note) => {
    // Check if optional data exists
    if (note.description) {
      // Change user data in 'database'
      notes[note.id].description = note.description;
    }
    // Check if optional data exists
    if ((note.studentTrainingId || note.studentTrainingId === 0)) {
      // Change user data in 'database'
      notes[note.id].studentTrainingId = note.studentTrainingId;
    }
    return notes[note.id];
  }
  
  notesService.delete = (id) => {
    notes.splice(id, 1);
    return true;
  }
  
  module.exports = notesService;