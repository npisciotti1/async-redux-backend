'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const listSchema = Schema({
  title: {type: String, required: true, unique: true},
  tasks: [{type: Schema.Types.ObjectId, ref: 'task'}],
})

module.exports = mongoose.model('list', listSchema)
