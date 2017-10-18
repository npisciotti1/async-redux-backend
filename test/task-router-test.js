'use strict';

require('dotenv').config()

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');

const List = require('../model/list.js');
const mockList = require('./lib/mock-list.js');
const mockTask = require('./lib/mock-task.js');
const clearDB = require('./lib/clear-db.js');

const API_URL = process.env.API_URL;

describe('testing /api/tasks', () => {
  before(server.start)
  after(server.stop);
  afterEach(clearDB);

  describe('POST /api/tasks', () => {
    let tempList;
    let tempTask;
    it('should create and return a task', () => {
      return mockList.createOne()
      .then(list => {
        tempList = list;
        return superagent.post(`${API_URL}/api/tasks`)
        .send({
          content: 'hello world',
          listID: list._id.toString(),
        })
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.content).toEqual('hello world');
        expect(res.body.listID).toEqual(tempList._id.toString());
        tempTask = res.body;

        return List.findById(tempList._id)
      })
      .then( list => {
        expect(list.tasks.length).toEqual(1);
        expect(list.tasks[0].toString()).toEqual(tempTask._id.toString())
      })
    })
  })
})
