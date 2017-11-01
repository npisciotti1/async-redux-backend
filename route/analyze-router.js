'use strict';

const Tesseract = require('node-tesseract');
const analyzeRouter = module.exports = new require('express').Router();

// const imgPath = `${__dirname}/../assets/movie.jpeg`


analyzeRouter.post('/api/analyze', (req, res, next) => {
  console.log('POST /api/analyze');

  console.log('got a request:', req.body);

  // Tesseract.process(req.body, (err, text) => {
  //   if(err) next(new Error('couldnt extract text'))
  //
  //   console.log(text);
  //   res.json(text);
  // })

})
