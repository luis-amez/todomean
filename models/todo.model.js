const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: String
});

todoSchema.plugin(mongoosePaginate);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;