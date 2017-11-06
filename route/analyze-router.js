'use strict';

const fs = require('fs');
const superagent = require('superagent');
const analyzeRouter = module.exports = new require('express').Router();


analyzeRouter.post('/api/analyze', (req, res, next) => {
  console.log('POST /api/analyze');

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

    body.requests[0].image.content = data;

    superagent.post(`https://vision.googleapis.com/v1/images:annotate`)
    .query({key: process.env.GOOGLE_API_KEY})
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, visionResult) => {
      if(err) next(new Error('couldnt upload to Google Cloud Vision'))
      res.send(visionResult.body);
    })
  })

});
