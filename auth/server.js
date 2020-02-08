'use strict';

const express = require('express');
const morgan = require('morgan');

// Auth 
const router = require('./routes.js');

const app = express();

// use logger 
const loggerReq = require('./logger.js');
app.use(loggerReq);

// errors 
const err404 = require('../middleware/404.js');
const err500 = require('../middleware/500.js');


app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('../public/index.html'));

app.use(router);

app.use(err404);
app.use(err500);


// Server listening 
module.exports = {
  server : app,
  start : port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT , ()=> console.log(`The App Is a live and Listening on Port No.${PORT}`));
  },
};