'use strict';

const Promise = require('bluebird');
const superagent = require('superagent-bluebird-promise');
const readFile = Promise.promisify(require('fs').readFile)

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

  return readFile(path, 'base64')
  .then(data => {
    console.log('file read');
    body.requests[0]['content'] = data;

    superagent.post('https://vision.googleapis.com/v1/images:annotate')
    .query({ key: process.env.GOOGLE_API_KEY })
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, text) => err ? err : text)
  })
  .then(text => Promise.resolve(text))
  .catch(err => err)

}
