'use strict';
const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const knex = require('knex');
const morgan = require('morgan');
switch (app.get('env')) {
    case 'development':
        app.use(morgan('dev'));
        break;

    case 'production':
        app.use(morgan('short'));
        break;

    default:

}

app.use(bodyParser.json());

const contacts = require('./routes/contacts');

app.use(express.static('./public'));

app.use(contacts);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
    if (err.output && err.output.statusCode) {
        return res
            .status(err.output.statusCode)
            .set('Content-Type', 'text/plain')
            .send(err.message);
    }

    console.error(err.stack);
    res.sendStatus(500);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    if (app.get('env') !== 'test') {
        console.log('Listening on port', port);
    }
});

module.exports = app;
