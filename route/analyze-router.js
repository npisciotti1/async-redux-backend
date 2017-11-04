'use strict';

const fs = require('fs');
const Tesseract = require('node-tesseract');
const analyzeRouter = module.exports = new require('express').Router();



analyzeRouter.post('/api/analyze', (req, res, next) => {
  console.log('POST /api/analyze');

  let imgPathWithExt = req.files.imageToExtract.path + '.jpeg';
  fs.rename(req.files.imageToExtract.path, imgPathWithExt);

  let thing = Tesseract.process(imgPathWithExt, (err, text) => {
    if(err) return (new Error('couldnt extract text'));

    sendRes(text);
  })

  function sendRes(text) {
    res.json(text);

    fs.unlink(imgPathWithExt, err => {
      if(err) console.error('couldnt delete image')

      console.log('image successfully deleted');
    });
  }

})
