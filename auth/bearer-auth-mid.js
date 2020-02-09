'use strict';

// to use the functions inside of it 
const users = require('./users.js');

module.exports = (req, res, next) => {

    // to check if the login process is valid or not by right information login 
    if (!req.headers.authorization) {
        next(' Invalid Login Process bearer auth  ');
        return;
    }

    // get the bearer token 
    let token = req.headers.authorization.split('Bearer ')[1];
    console.log('token inside bearer middleware  : ', token);

    users.authenticateBearerToken(token)
        .then(isValidUser => {
            req.user = isValidUser;
            next();
        })
        .catch(err => next(' invalid user bearer ', err));

} // end of middleware function 
