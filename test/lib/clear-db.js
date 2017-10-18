'use strict';

const List = require('../../model/list.js')
const Task = require('../../model/task.js')

module.exports = () => {
  return Promise.all([
    List.remove({}),
    Task.remove({})
  ])
}
