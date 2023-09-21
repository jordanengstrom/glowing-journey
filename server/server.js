const PORT = process.env.PORT ?? 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all todos
app.get('/todos/:userEmail', async (req, res) => {
    // console.log('REQ:', req);
    const { userEmail } = req.params;
    console.log('userEmail:', userEmail)
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1;', [userEmail]);
        res.json(todos.rows);
    }
    catch (err) {
        console.error(err);
    }
});

// create a new todo
app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();
    console.log(user_email, title, progress, date);
    try {
        const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5);`,
        [id, user_email, title, progress, date]);
        res.json(newToDo);
    }
    catch (err) {
        console.error(err);
    }
});

// edit a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;
    try {
        const editToDo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;',
        [user_email, title, progress, date, id]);
        res.json(editToDo);
    }
    catch (err) {
        console.error(err);
    }
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;',
        [id]);
        res.json(deleteToDo);
    }
    catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
