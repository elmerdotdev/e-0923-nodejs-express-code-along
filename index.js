// Import Express
const express = require('express')

// Set up Express
const app = express()

// Middleware
app.use(express.json()) // Process incoming json

// In-memory database
let todos = []

// Routes
// Fetch todos
app.get('/todos', (req, res) => {
  res.json(todos)
})

// Fetch todo by id
app.get('/todos/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find(todo => todo.id === parseInt(id))
  if (todo) {
    res.json(todo)
  } else {
    res.status(404).send('Todo does not exist')
  }
})

// Add todo
app.post('/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    text: req.body.todoText,
    user: req.body.user,
    completed: false
  }
  todos.push(todo)
  res.status(201).json(todo)
})

// Update todo by id
app.put('/todos/:id', (req, res) => {
  const { id } = req.params
  const foundIndex = todos.findIndex(todo => todo.id === parseInt(id))
  if (foundIndex !== -1) {
    const updatedTodo = {
      ...todos[foundIndex],
      text: req.body.todoText,
      user: req.body.user,
      completed: req.body.completed
    }
    todos[foundIndex] = updatedTodo
    res.json(todos[foundIndex])
  } else {
    res.status(404).send('Todo does not exist')
  }
})

// Delete todo by id
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params
  const foundIndex = todos.findIndex(todo => todo.id === parseInt(id)) // Finds index of todo item
  if (foundIndex !== -1) {
    todos = todos.filter(todo => todo.id !== parseInt(id))
    res.status(200).send('Todo was deleted!')
  } else {
    res.status(404).send('Todo does not exist')
  }
})

// Start server
const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})