'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());



// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = 'make_name';
// b. the parameters that are parsed from the make_name intent
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';


app.post('/', (request, response) => {

  const app = new App({request, response});

  console.log(`[36m%s[0m`, `Request Headers:`);
  console.log( JSON.stringify(request.headers, undefined, 2) );
  console.log(`[36m%s[0m`, `Request Body`);
  console.log( JSON.stringify(request.body, undefined, 2) );



  // c. The function that generates the silly name
  function makeName (app) {
    let number = app.getArgument(NUMBER_ARGUMENT);
    let color = app.getArgument(COLOR_ARGUMENT);
    app.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! I hope you like it. See you next time.');
  }

  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);


  app.handleRequest(actionMap);

})



app.listen(PORT, () => {
    console.log(`[36m%s[0m`, `# API Listening at: http://localhost:${PORT}`);
  });
