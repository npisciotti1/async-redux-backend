'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI)

const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));

//load routes
app.use(require('../route/list-router.js'))
app.use(require('../route/task-router.js'))

//add 404 to all routes
app.all('/api/*', (req, res, next) => res.sendStatus(404))

//error middleware, loaded last
app.use(require('./error-middleware.js'));

const server = module.exports = {};
server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      return server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server up on port: ', process.env.PORT)
        resolve();
      });
    }
    reject(new Error('server running already'))
  })
}

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn){
      return server.http.close(() => {
        server.isOn = false
        console.log('server down')
        resolve()
      })
    }
    reject(new Error('the server is not running'))
  })
}
