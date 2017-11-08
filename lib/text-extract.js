'use strict';

const fs = require('fs');
const superagent = require('superagent');

module.exports = (path) => {

  //google vision config object - will also carry data, hence "body"
  let body = {
    requests: [
      {
        image: {
          content: null //set on line 29
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION"
          }
        ]
      }
    ]
  };

  fs.readFile(path, 'base64', (err, data) => {
    if(err) return Promise.reject(err);

    Promise.resolve(data)
  })
  .then(data => {
    body.requests[0]['content'] = data;
    superagent.post('https://vision.googleapis.com/v1/images:annotate')
    .query({ key: process.env.GOOGLE_API_KEY })
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, visionResult) => {
      if(err) return Promise.reject(err);

      return Promise.resolve(visionResult);
    })
  })
}
