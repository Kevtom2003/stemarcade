const express = require('express');
const { Pool } = require("pg");
const cors = require('cors');

DB_USER = 'postgres'
DB_HOST = '34.121.41.210'
DB_DATABASE = 'postgres'
DB_PASSWORD = 'epicpassword'
DB_PORT = 5432

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
});

// const corsOptions = {
//     origin: "http://localhost:3000",
// };


const app = express();

// app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

// LOG IN
// teacher
app.get('/api/teacher/:username/:password', cors(), async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM teacher WHERE username = $1 AND password = $2', [req.params.username, req.params.password]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});


// student
app.get('/api/student/:first_name/:last_name/:class_id', cors(), async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM student WHERE first_name = $1 AND last_name = $2 AND class_id = $3', [req.params.first_name, req.params.last_name, req.params.class_id]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

// GET
app.get('/api/class/:teacher_id', cors(), async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM class WHERE teacher_id = $1;', [req.params.teacher_id]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/api/assignment/:class_id', cors(), async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM assignment WHERE class_id = $1;', [req.params.class_id]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/api/assignment_student/:assignment_id', cors(), async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT sa.*, s.first_name, s.last_name FROM student_assignment sa JOIN student s ON sa.student_id = s.student_id WHERE sa.assignment_id = $1;', [req.params.assignment_id]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});


// CREATE
// student
app.post(
  "/api/student/:first_name/:last_name/:class_id",
  cors(),
  async (req, res) => {
    try {
      const { first_name, last_name, class_id } = req.params;
      const query =
        "INSERT INTO student (first_name, last_name, class_id) VALUES ($1, $2, $3) RETURNING *"; // Assuming you want to return the inserted row
      const result = await pool.query(query, [first_name, last_name, class_id]);

      // Check if 'rows' is in the result
      if (result && result.rows) {
        res.send(result.rows);
      } else {
        // Handle the case where 'rows' is not present
        res.status(500).send("Unexpected result format from the database");
      }
    } catch (error) {
      console.error("Error querying database:", error);
      res.status(500).send("Internal server error");
    }
  }
);


// assignment
app.post(
  "/api/assignment/:name/:description/:class_id/:game/:target_score/:due_date",
  cors(),
  async (req, res) => {
    try {
      const { name, description, class_id, game, target_score, due_date } =
        req.params;
      const query =
        "INSERT INTO assignment (name, description, class_id, game, target_score, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const result = await pool.query(query, [
        name,
        description,
        class_id,
        game,
        target_score,
        due_date,
      ]);

      if (result && result.rows) {
        res.send(result.rows);
      } else {
        res.status(500).send("Unexpected result format from the database");
      }
    } catch (error) {
      console.error("Error querying database:", error);
      res.status(500).send("Internal server error");
    }
  }
);


// class
app.post('/api/class/:class_name/:teacher_id/:grade', cors(), async (req, res) => {
    try{
        const { rows } = await pool.query('INSERT INTO class (class_name, teacher_id, grade) VALUES ($1, $2, $3)', [req.params.class_name], [req.params.teacher_id], [req.params.grade]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

// UPDATE
app.post('/api/student_assignment/:student_id/:assignment_id/:score', cors(), async (req, res) => {
    try{
        const { rows } = await pool.query('UPDATE student_assignment SET score = $1 WHERE student_id = $2 AND assignment_id = $3', [req.params.score], [req.params.student_id], [req.params.assignment_id]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});


// host
app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
    }
);