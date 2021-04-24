// Import express and put it into express constant
const express = require("express");
// Create express object and put it into app constant
const app = express();
const cookieParser = require('cookie-parser');
var cors = require("cors");

const config = require("./config");
const port = config.port;

// Import controllers
const pingController = require("./API/controllers/pingController");
const usersController = require("./API/controllers/usersController");
const studentsController = require("./API/controllers/studentsController");
const exercisesController = require("./API/controllers/exercisesController");
const authController = require("./API/controllers/authController");

// Import logger middleware
const isLoggedIn = require("./API/middlewares/isLoggedIn");
const logger = require("./API/middlewares/logger");

// Middleware required for receiving body from request object as JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Routes
app.get("/api/ping", pingController.ping);
app.post("/api/login", authController.login);
app.get("/api/logout", authController.logout);
app.get("/api/session", authController.getSession);
app.post("/api/users", usersController.create);
app.get("/api/users", usersController.read); //Tõstan välja loggedIn nõudest

app.use(isLoggedIn);

//app.get('/api/users', usersController.read);
app.get("/api/users/:id", usersController.readById);
//app.get("/api/session", authController.getSession);
//app.post('/api/users', usersController.create);
app.put("/api/users", usersController.update);
app.delete("/api/users", usersController.delete);

app.get("/api/students", studentsController.read);
app.get("/api/students/:id", studentsController.readById);
app.post("/api/students", studentsController.create);
app.put("/api/students", studentsController.update);
app.delete("/api/students/:id", studentsController.delete);

app.get("/api/exercises", exercisesController.read);
app.get("/api/exercises/:id", exercisesController.readById);
app.post("/api/exercises", exercisesController.create);
app.put("/api/exercises", exercisesController.update);
app.delete("/api/exercises/:id", exercisesController.delete);

app.get("/api/trainingplans", trainingplansController.read);
app.get("/api/trainingplans/:id", trainingplansController.readById);
app.post("/api/trainingplans", trainingplansController.create);
app.put("/api/trainingplans", trainingplansController.update);
app.delete("/api/trainingplans/:id", trainingplansController.delete);

app.listen(3000, () => {
  console.log("Server running");
});
