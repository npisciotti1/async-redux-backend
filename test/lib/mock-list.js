'use strict';

const faker = require('faker');
const List = require('../../model/list.js');

const mockList = module.exports = {}

mockList.createOne = () => {
  return new List({
    title: faker.random.words(3)
  })
  .save()
}

mockList.createMany = (n) => {
  //filling with zeroes to use map
  let mockListPromises = new Array(n)
    .fill(0).map(() => mockList.createOne());

  return Promise.all(mockListPromises)
}
