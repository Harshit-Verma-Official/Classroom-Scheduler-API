const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

// Connection
let mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "teachers",
  multipleStatements: true,
});

mySqlConnection.connect((error) => {
  if (!error) console.log("DB connection successful.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(error, undefined, 2)
    );
});
// Connection

// GET All Teachers
app.get("/api/teachers", (req, res) => {
  mySqlConnection.query("SELECT * from teachers", (err, rows, fields) => {
    if (!err) res.send(rows);
    else res.send(err);
  });
});

// Get a single Teacher
app.get("/api/teachers/:id", (req, res) => {
  mySqlConnection.query(
    "SELECT * from teachers WHERE teacher_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.send(err);
    }
  );
});

// GET All Tasks
app.get("/api/tasks", (req, res) => {
  let query = req.query.teacher_id
    ? `SELECT * FROM tasks WHERE teacher_id = ${req.query.teacher_id}`
    : "SELECT * FROM tasks";
  mySqlConnection.query(query, (err, rows, fields) => {
    if (!err) res.send(rows);
    else res.send(err);
  });
});

// GET a single Task
app.get("/api/tasks/:id", (req, res) => {
  mySqlConnection.query(
    "SELECT * FROM tasks WHERE task_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.send(err);
    }
  );
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  mySqlConnection.query(
    "DELETE FROM tasks WHERE task_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send({ task_id: req.params.id });
      else res.send(err);
    }
  );
});

// POST a task
app.post("/api/tasks", (req, res) => {
  var query =
    "SET @task_id = ?;\
                 SET @teacher_id = ?;\
                 SET @task_name = ?;\
                 SET @task_date = ?;\
                 SET @start_time = ?;\
                 SET @end_time = ?;\
                 CALL InsertOrUpdateTask(@task_id, @teacher_id, @task_name, @task_date, @start_time, @end_time);";
  let reqBody = req.body;

  mySqlConnection.query(
    query,
    [
      reqBody.task_id,
      reqBody.teacher_id,
      reqBody.task_name,
      reqBody.task_date,
      reqBody.start_time,
      reqBody.end_time,
    ],
    (err, rows, fields) => {
      if (!err)
        rows.forEach((item) => {
          if (item.constructor == Array) res.send(item[0]);
        });
      else res.send(err.message);
    }
  );
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server running in port ${process.env.PORT || PORT}`)
);
