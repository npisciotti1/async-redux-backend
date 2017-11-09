'use strict';

const fs = require('fs');

module.exports = (req, res, next) => {

  //add '.jpeg' extension to uploaded file;
  let imgPathWithExt = req.files.imageToExtract.path + '.jpeg';
  fs.rename(req.files.imageToExtract.path, imgPathWithExt);

  //attach image path to request object
  req.headers.imagePath = imgPathWithExt;
  next();

}
