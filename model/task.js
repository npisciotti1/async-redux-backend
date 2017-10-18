'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const List = require('./list.js');

const taskSchema = Schema({
  content: {type: String, required: true},
  listID: {type: Schema.Types.ObjectId, required: true, ref: 'list'}
});

taskSchema.pre('save', function(next) {
  List.findById(this.listID)
  .then( list => {
    list.tasks.push(this._id)
    return list.save()
  })
  .then( () => next())
  .catch( () => next(new Error('failed to create note - list does not exist')))
})

// taskSchema.post('save', function(doc, next) {
//   List.findById(doc.listID)
//   .then( list => {
//     console.log('did we get here?')
//     list.tasks.push(doc._id);
//     return list.save();
//   })
//   .then( () => next())
//   .catch(next)
//
// })

taskSchema.post('remove', function(doc) {
  List.findById(doc.listID)
  .then(list => {
    list.tasks = list.tasks.filter(task => task._id !== doc._id)
    return list.save()
  })
  .then( () => next())
  .catch(next)
})

module.exports = mongoose.model('task', taskSchema);
