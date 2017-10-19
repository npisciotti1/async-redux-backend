'use strict';

const jsonParser = require('body-parser').json();
const taskRouter = module.exports = new require('express').Router();

const Task = require('../model/task.js');

taskRouter.post('/api/tasks', jsonParser, (req, res, next) => {
  console.log('POST /api/tasks');

  new Task(req.body)
  .save()
  .then( task => res.json(task))
  .catch(next);
})

taskRouter.put('/api/tasks/:id', jsonParser, (req, res, next) => {
  console.log('PUT /api/tasks/:id');

  let options = {
    new: true,
    runValidators: true
  }

  Task.findByIdAndUpdate(req.params.id, req.body, options)
  .then(task => res.json(task))
  .catch(next);
})
