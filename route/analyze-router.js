'use strict';

const fs = require('fs');
// const Tesseract = require('node-tesseract');
const extract = new require('tesseract_native').OcrEio();
const analyzeRouter = module.exports = new require('express').Router();

analyzeRouter.post('/api/analyze', (req, res, next) => {
  console.log('POST /api/analyze');

  let imgPathWithExt = req.files.imageToExtract.path + '.jpeg';
  fs.rename(req.files.imageToExtract.path, imgPathWithExt);

  fs.readFile(imgPathWithExt, (err, data) => {
    if (err) next(new Error('file not found'));

    extract.ocr(data, (err, results) => {
      if (err) next(new Error('couldnt extract text'));

      res.send(results);
      fs.unlink(imgPathWithExt, err => {
        if (err) next(new Error(('couldnt delete image')));
      });
    })
  })

});
