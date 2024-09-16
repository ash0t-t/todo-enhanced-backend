const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
  title: String,
  createdAt: Date,
});

module.exports = mongoose.model('items', itemsSchema);