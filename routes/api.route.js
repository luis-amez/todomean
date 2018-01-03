const express = require('express');
const router = express.Router();

const todoRoute = require('./api/todo.route');

router.use('/todos', todoRoute);

module.exports = router;