const TodoService = require('../services/todo.service');

exports.getTodos = async function(req, res, next) {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  try {
    const todos = await TodoService.getTodos({}, page, limit);
    return res.status(200).json({status: 200, data: todos, message: "Success receiving to do list!"});
  } catch(error) {
    return res.status(400).json({status: 400, message: error.message});
  }
}

exports.createTodo = async function(req, res, next) {
  const todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  }

  try {
    const newTodo = await TodoService.createTodo(todo);
    return res.status(201).json({status: 201, data: newTodo, message: "Success creating to do!"});
  } catch (error) {
    return res.status(400).json({status: 400, message: error.message});
  }
}

exports.updateTodo = async function(req, res, next) {
  if(!req.body._id) {
    return res.status(400).json({status: 400, message: "Id must be present!"});
  }
  const id = req.body._id;

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null,
  };

  try {
    const editedTodo = await TodoService.updateTodo(todo);
    return res.status(200).json({status: 200, data: editedTodo, message: "Success updating to do!"})
  } catch(error) {
    return res.status(400).json({status: 400, message: error.message});
  }
}

exports.removeTodo = async function(req, res, next) {
  const id = req.params.id;

  try {
    const deletedTodo = await TodoService.deleteTodo(id);
    return res.status(204).json({status: 204, message: "Success deleting to do!"});
  } catch(error) {
    return res.status(400).json({status: 400, message: error.message});
  }
}