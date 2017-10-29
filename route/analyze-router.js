'use strict';

const Tesseract = require('node-tesseract');
const jsonParser = require('body-parser').json();
const analyzeRouter = module.exports = new require('express').Router();

const imgPath = `${__dirname}/../assets/movie.jpeg`


analyzeRouter.post('/api/analyze', jsonParser, (req, res, next) => {
  console.log('POST /api/analyze');

  console.log('got a request:', req.body);

  Tesseract.process(imgPath, (err, text) => {
    console.log(imgPath)
    if(err) next(new Error('couldnt extract text'))


    console.log(text);
    res.json(text);
  })

})
