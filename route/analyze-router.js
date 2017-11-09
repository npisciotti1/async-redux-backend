'use strict';

const fs = require('fs');
const textExtract = require('../lib/text-extract');
const imageParse = require('../lib/image-parse-middleware');
const analyzeRouter = module.exports = new require('express').Router()

analyzeRouter.get('/', (req, res, next) => {
  res.status(200).json({cool: 'beans'});

})

analyzeRouter.post('/api/analyze', imageParse, (req, res, next) => {
  console.log('POST /api/analyze');

  textExtract(req.headers.imagePath)
  .then(text => {
    res.status(200).send(text)

    //delete temp file
    fs.unlink(req.headers.imagePath, err => next(err))
  })
  .catch(next)
});
