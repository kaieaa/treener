// Import express and put it into express constant
const express = require('express');
// Create express object and put it into app constant
const app = express();

// Import controllers
const pingController = require('./api/controllers/pingController');
const usersController = require('./api/controllers/usersController');
const studentsController = require('./API/controllers/studentsController');
const exercisesController = require('./API/controllers/exercisesController');
const groupsController = reuqire('.API/controllers/groupsController');
const groupExercisesController = reuqire('.API/controllers/groupExercisesController');
const studentTrainingsController = require('./API/controllers/studentTrainingsController');
const studentTrainingExercisesController = require('./API/controllers/studentTrainingExercisesController');
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

app.get('/api/groups', groupsController.read);
app.get('/api/groups/:id', groupsController.readById);
app.post('/api/groups', groupsController.create);
app.put('/api/groups', groupsController.update);
app.delete('/api/groups', groupsController.delete);

app.get('/api/groupExercises', groupExercisesController.read);
app.get('/api/groupExercises/:id', groupExercisesController.readById);
app.post('/api/groupExercises', groupExercisesController.create);
app.put('/api/groupExercises', groupExercisesController.update);
app.delete('/api/groupExercises', groupExercisesController.delete);

app.get('/api/studentTrainings', studentTrainingsController.read);
app.get('/api/studentTrainings/:id', studentTrainingsController.readById);
app.post('/api/studentTrainings', studentTrainingsController.create);
app.put('/api/studentTrainings', studentTrainingsController.update);
app.delete('/api/studentTrainings', studentTrainingsController.delete);

app.get('/api/studentTrainingExercises', studentTrainingExercisesController.read);
app.get('/api/studentTrainingExercises/:id', studentTrainingExercisesController.readById);
app.post('/api/studentTrainingExercises', studentTrainingExercisesController.create);
app.put('/api/studentTrainingExercises', studentTrainingExercisesController.update);
app.delete('/api/studentTrainingExercises', studentTrainingExercisesController.delete);

app.get('/api/notes', notesController.read);
app.get('/api/notes/:id', notesController.readById);
app.post('/api/notes', notesController.create);
app.put('/api/notes', notesController.update);
app.delete('/api/notes', notesController.delete);

app.listen(3000, () => {
    console.log('Server running');
});