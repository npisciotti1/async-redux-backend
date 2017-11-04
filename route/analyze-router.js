'use strict';

const fs = require('fs');
const analyzeRouter = module.exports = new require('express').Router();

analyzeRouter.post('/api/analyze', (req, res, next) => {
  console.log('POST /api/analyze');

  let imgPathWithExt = req.files.imageToExtract.path + '.jpeg';
  fs.rename(req.files.imageToExtract.path, imgPathWithExt);

  fs.readFile(imgPathWithExt, (err, data) => {
    if (err) next(new Error('file not found'));

  })

});
