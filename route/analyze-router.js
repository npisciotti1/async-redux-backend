'use strict';

const fs = require('fs');
const superagent = require('superagent');
const analyzeRouter = module.exports = new require('express').Router()

analyzeRouter.get('/', (req, res, next) => {
  res.status(200).json({cool: 'beans'});

})

analyzeRouter.post('/api/analyze', (req, res, next) => {
  console.log('POST /api/analyze');

  //build this out as middleware
  let imgPathWithExt = req.files.imageToExtract.path + '.jpeg';
  fs.rename(req.files.imageToExtract.path, imgPathWithExt);

  let body = {
    requests: [
      {
        image: {
          content: null
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION"
          }
        ]
      }
    ]
  };

  fs.readFile(imgPathWithExt, 'base64', (err, data) => {
    if (err) next(new Error('file not found'));

    //set base64 data on Google Vision request body
    body.requests[0].image.content = data;

    superagent.post(`https://vision.googleapis.com/v1/images:annotate`)
    .query({ key: process.env.GOOGLE_API_KEY })
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, visionResult) => {
      if(err) next(new Error('couldnt upload to Google Cloud Vision'))
      res.status(200).json(visionResult.body);

      //delete temp file
      fs.unlink(imgPathWithExt, err => next(err))
    })
  })
});
