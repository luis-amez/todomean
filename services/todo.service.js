const Todo = require('../models/todo.model');

// Get the to do list
exports.getTodos = async function(query, page, limit) {
  // Options setup for the mongoose paginate
  const options = {
    page,
    limit
  };

  try {
    const todos = await Todo.paginate(query, options);
    return todos;
  } catch(error) {
    throw Error('Error getting to do list!');
  }
}

// Create a new to do
exports.createTodo = async function(todo) {
  const newTodo = new Todo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  });

  try {
    const savedTodo = await newTodo.save();
    return savedTodo;
  } catch(error) {
    throw Error('Error creating the to do!');
  }
}

// Edit a to do
exports.updateTodo = async function(todo) {
  const id = todo.id;

  try {
    const editedTodo = await Todo.findById(id);
  } catch(error) {
    throw Error('Error finding the to do!');
  }

  if(!editedTodo) {
    return false;
  }

  editedTodo.title = todo.title;
  editedTodo.description = todo.description;
  editedTodo.status = todo.status;
  
  try {
    const savedTodo = await editedTodo.save();
    return savedTodo;
  } catch(error) {
    throw Error('Error updating the to do!');
  }
}

// Delete a to do
exports.deleteTodo = async function(id) {
  try {
    const deletedTodo = await Todo.remove({ _id: id });
    if(deletedTodo.result.n === 0) {
      throw Error('To do could not be delete');
    }
    return deletedTodo;
  } catch(error) {
    throw Error('Error deleting the to do!')
  }
}