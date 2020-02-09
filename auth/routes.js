'use strict';

const express = require('express');
const router = express.Router();

const basicAuth = require('./basic-mid-auth.js');
const users = require('./users.js');

const oauth = require('./oauth-mid.js');
const bearerAuth = require('./bearer-auth-mid.js');
/************************************************* AUTH *************************************************************/


/**
 * dynamic routing for sgin up and return Token 
 */
router.post('/signup',(req,res) =>
{
  users.save(req.body)
    .then(user => {
      let token = users.genToken(user);
      res.status(200).send(token);
    })
    .catch(err => console.error(err));

}); // end of signup route 

/**
 * dynamic routing for sgin in and return req.Token using middleware 
 */
router.post('/signin',basicAuth,(req,res) =>
{
  res.status(200).send(req.token);
}); // end of signin route 

/**
 * dynamic routing for all users list and return the list using middleware 
 */
// out all users list in db 
router.get('/users',basicAuth,(req,res) =>
{
  res.status(200).json(users.list);
}); // end of signup route 


/************************************************* OAUTH *************************************************************/
// access pages 
// it will be hit by HTML login tag to make a request to this route 
router.get('/oauth' , oauth, (req,res) =>
{
  res.status(200).send(req.token);
}); // end of oauth route 

/************************************************ BEARER AUTH *********************************************************/
router.get('/user', bearerAuth , (req,res) => 
{
  res.status(200).json(req.user);
}); // end of user route 


module.exports = router;