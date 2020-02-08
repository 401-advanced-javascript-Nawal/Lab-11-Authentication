'use strict';

// make request to github API to do the handshake with it 
const superagent = require('superagent');
const users = require('./users.js');

// url that github tells us to make request to it to get the access token 
const tokenAccessURL = 'https://github.com/login/oauth/access_token';

// API accessing 
const remoteAccessAPI = 'https://api.github.com/user';

// inside .env file 
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// create an app on github through this route  
const SERVER_API = process.env.SERVER_API;

