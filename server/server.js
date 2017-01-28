var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
//For Heroku
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/todos',(req, res) =>{
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/1234567
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Validate ID using isValid
  //if not valid respond with 404
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //Query DB using findById
  //if success, if there is todo, send it back else send back 404
  //if error, send back 400
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req, res) => {
    //get the id
    var id = req.params.id;
    //validate the ID
    if(!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    //remove to do
    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send(todo);
    }).catch((e) => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
