// Import express and put it into express constant
const express = require('express');
// Create express object and put it into app constant
const app = express();

// Import controllers
const pingController = require('./api/controllers/pingController');
const usersController = require('./api/controllers/usersController');
const studentsController = require('./API/controllers/studentsController');
const exercisesController = require('./API/controllers/exercisesController');
const studentExercisesController = require('./api/controllers/studentExercisesController');
const notesController = require('./API/controllers/notesController');

// Middleware required for receiving body from request object as JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/ping', pingController.ping);

app.get('/api/users', usersController.read);
app.get('/api/users/:id', usersController.readById);
app.post('/api/users', usersController.create);
app.put('/api/users', usersController.update);
app.delete('/api/users', usersController.delete);

app.get('/api/students', studentsController.read);
app.get('/api/students/:id', studentsController.readById);
app.post('/api/students', studentsController.create);
app.put('/api/students', studentsController.update);
app.delete('/api/students', studentsController.delete);

app.get('/api/exercises', exercisesController.read);
app.get('/api/exercises/:id', exercisesController.readById);
app.post('/api/exercises', exercisesController.create);
app.put('/api/exercises', exercisesController.update);
app.delete('/api/exercises', exercisesController.delete);

app.get('/api/studentExercises', studentExercisesController.read);
app.get('/api/studentExercises/:id', studentExercisesController.readById);
app.post('/api/studentExercises', studentExercisesController.create);
app.put('/api/studentExercises', studentExercisesController.update);
app.delete('/api/studentExercises', studentExercisesController.delete);

app.get('/api/notes', notesController.read);
app.get('/api/notes/:id', notesController.readById);
app.post('/api/notes', notesController.create);
app.put('/api/notes', notesController.update);
app.delete('/api/notes', notesController.delete);

app.listen(3000, () => {
    console.log('Server running');
});