const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result)
// });

// Todo.findOneAndRemove({_id: '588c8a523c3feecf51a6ef9d'}).then((todo) => {
//
// });

Todo.findByIdAndRemove('588c8a523c3feecf51a6ef9d').then((todo) => {
  console.log(todo);
});
