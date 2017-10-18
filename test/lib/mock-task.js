'use strict';

const faker = require('faker');
const mockList = require('./mock-list.js');
const Task = require('../../model/task.js');

const mockTask = module.exports = {};

mockTask.createOne = () => {
  let result = {};
  mockList.createOne()
  .then( list => {
    result.list = list;
    new Task({
      content: faker.random.words(3),
      listID: list._id.toString()
    })
    .save()
  })
  .then(task => {
    result.task = task;
    return result;
  })
}

mockTask.createMany = (n) => {
  let result = {};
  mockList.createOne()
  .then( list => {
    result.list = list;
    let taskArrayPromises = new Array(n)
      .fill(0).map( () => { new Task({
        content: faker.random.words(10),
        listID: list._id.toString()
        }).save()
      })
    return Promise.all([taskArrayPromises])
  })
  .then( tasks => {
    result.tasks = tasks;
    return result;
  })
}
