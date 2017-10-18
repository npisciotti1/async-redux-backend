'use strict';

const jsonParser = require('body-parser').json();
const taskRouter = module.exports = new require('express').Router();

const Task = require('../model/task.js');

taskRouter.post('/api/tasks', jsonParser, (req, res, next) => {
  console.log('/api/tasks');

  new Task(req.body)
  .save()
  .then( task => res.json(task))
  .catch(next);
})
