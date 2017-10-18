'use strict';

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

require('dotenv').config();

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockList = require('./lib/mock-list.js');

const API_URL = process.env.API_URL;


describe('testing /api/lists', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/lists', () => {
    let data = {title: faker.name.title()}
    it('should respond with the new list', () => {
      return superagent.post(`${API_URL}/api/lists`)
      .send(data)
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(data.title);
        expect(res.body.tasks).toEqual([]);
        expect(res.body).toHaveProperty('_id');
      })
    })
  })

  describe('testing GET /api/lists/:id', () => {
    let tempList;
    it('should return a list', () => {
      return mockList.createOne()
      .then(list => {
        tempList = list;
        return superagent.get(`${API_URL}/api/lists/${list._id}`)
       })
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(tempList.title);
        expect(res.body.tasks).toEqual([]);
      })
    })
  })

  describe('testing GET /api/lists', () => {
    let tempListArray;
    it('should return an array with max of 50 lists', () => {
      return mockList.createMany(150)
      .then(listArray => {
        tempListArray = listArray;
        return superagent.get(`${API_URL}/api/lists?page=2`)
      })
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(50);
        res.body.forEach(list => {
          expect(list).toHaveProperty('title');
          expect(list).toHaveProperty('_id');
          expect(list.tasks).toEqual([]);
        })
      })
    })
  })

  describe('testing GET /api/lists', () => {
    let tempListArray;
    it('should return an empty array since there isnt a third page', () => {
      return mockList.createMany(100)
      .then(listArray => {
        tempListArray = listArray;
        return superagent.get(`${API_URL}/api/lists?page=3`)
      })
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(0);
      })
    })
  })
})
