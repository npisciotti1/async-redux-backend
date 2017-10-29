'use strict';

const jsonParser = require('body-parser').json();
const listRouter = module.exports = new require('express').Router();

const List = require('../model/list.js');

listRouter.post('/api/lists', jsonParser, (req, res, next) => {
  console.log('POST /api/lists');

  new List(req.body).save()
  .then(list => res.json(list))
  .catch(next)
})

listRouter.get('/api/lists/:id', (req, res, next) => {
  console.log('GET /api/lists/:id');

  List.findById(req.params.id)
  .then(list => res.json(list))
  .catch(next)
})

listRouter.get('/api/lists', (req, res, next) => {
  console.log('GET /api/lists');

  let pageNumber = Number(req.query.page);

  //pagination, the decrement is for translating results to pages
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  List.find({})
  .sort({title: 'asc'})
  .skip(pageNumber * 50)
  .limit(50)
  .then(lists => res.json(lists))
  .catch(next);
})

listRouter.put('/api/lists/:id', jsonParser, (req, res, next) => {
  console.log('PUT /api/lists/:id');

  let options = {
    new: true,
    runValidators: true
  }

  List.findByIdAndUpdate(req.params.id, req.body, options)
  .then(list => res.json(list))
  .catch(next);
})

listRouter.delete('/api/lists/:id', (req, res, next) => {
  console.log('DELETE /api/lists/:id');

  List.findByIdAndRemove(req.params.id)
  .then( () => res.sendStatus(204))
  .catch(next);
})
