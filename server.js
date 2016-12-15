'use strict';
const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const knex = require('knex');
const morgan = require('morgan');
switch (app.get('env')){
  case 'development':
  app.use(morgan('dev'));
  break;

  default:

}

app.use(express.static('public'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
