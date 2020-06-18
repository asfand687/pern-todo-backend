const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false }));


// ROUTES

// get all todos

app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * From todo');
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id= $2',
      [description, id]
    );
    res.json(`Todo with id(${id}) was updated`);
  } catch (err) {
    console.error(err);
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.json('Todo was successfully deleted');
  } catch (err) {
    console.error(err.message);
  }
});

// create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
