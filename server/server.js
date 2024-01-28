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


const app = express();

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


// CREATE
// student
app.post('/api/student/:first_name/:last_name/:class_id', cors(), async (req, res) => {
    try{
        const { rows } = await pool.query('INSERT INTO student (first_name, last_name, class_id) VALUES ($1, $2, $3)', [req.params.first_name], [req.params.last_name], [req.params.class_id]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

// assignment
app.post('/api/assignment/:name/:description/:class_id/:game/:target_score/:due_date', cors(), async (req, res) => {
    try{
        const { rows } = await pool.query('INSERT INTO assignment (name, description, class_id, game, due_date) VALUES ($1, $2, $3, $4, $5, $6)', [req.params.name], [req.params.description], [req.params.class_id], [req.params.game], [req.params.target_score], [req.params.due_date]);
        res.send(rows);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal server error');
    }
});

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