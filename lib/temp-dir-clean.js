'use strict';

const fs = require('fs');

module.exports = (req, res, next) => {
  if(req.headers.imagePath)
    fs.unlink(req.headers.imagePath)
}
