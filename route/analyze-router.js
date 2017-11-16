'use strict';

const textExtract = require('../lib/text-extract');
const imageParse = require('../lib/image-parse-middleware');
const analyzeRouter = module.exports = new require('express').Router()

analyzeRouter.post('/api/analyze', imageParse, (req, res, next) => {
  console.log('POST /api/analyze');

  textExtract(req.headers.imagePath)
  .then(text => {
    res.status(200).send(text)
    return next();
  })
  .catch(err => next(err));
});
