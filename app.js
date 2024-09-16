const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todolist");
const app = express();
app.use(express.json());
const ItemsRouter = require('./api/items');
app.use('/', ItemsRouter);

app.get('/', async (req, res) => {
  res.send("Ok");
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000...");
})