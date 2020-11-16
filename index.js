// Import express and put it into express constant
const express = require('express');
// Create express object and put it into app constant
const app = express();

// Import controllers
const pingController = require('./api/controllers/pingController');
const usersController = require('./api/controllers/usersController');
const lecturersController = require('./api/controllers/lecturersController');
const subjectsController = require('./api/controllers/subjectsController');
const homeworksController = require('./api/controllers/homeworksController');

// Middleware required for receiving body from request object as JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/ping', pingController.ping);

app.get('/api/users', usersController.read);
app.get('/api/users/:id', usersController.readById);
app.post('/api/users', usersController.create);
app.put('/api/users', usersController.update);
app.delete('/api/users', usersController.delete);

app.get('/api/lecturers', lecturersController.read);
app.get('/api/lecturers/:id', lecturersController.readById);
app.post('/api/lecturers', lecturersController.create);
app.put('/api/lecturers', lecturersController.update);
app.delete('/api/lecturers', lecturersController.delete);

app.get('/api/subjects', subjectsController.read);
app.get('/api/subjects/:id', subjectsController.readById);
app.post('/api/subjects', subjectsController.create);
app.put('/api/subjects', subjectsController.update);
app.delete('/api/subjects', subjectsController.delete);

app.get('/api/homeworks', homeworksController.read);
app.get('/api/homeworks/:id', homeworksController.readById);
app.post('/api/homeworks', homeworksController.create);
app.put('/api/homeworks', homeworksController.update);
app.delete('/api/homeworks', homeworksController.delete);

app.listen(3000, () => {
    console.log('Server running');
});