'use strict';

const express = require('express');
const router = express.Router();

// authentication process 
const users = require('./users.js');
const basicAuth = require('./basic-mid-auth.js');
const oauth = require('./oauth-mid.js');
const bearerAuth = require('./bearer-auth-mid.js');
const aclAuth = require('./acl-mid.js');
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
/**
 * it will be hit by HTML login tag to make a request to this route
 * access pages 
 */
router.get('/oauth' , oauth, (req,res) =>
{
  res.status(200).send(req.token);
}); // end of oauth route 

/************************************************ BEARER AUTH *********************************************************/
/**
 * bearer auth 
 */
router.get('/user', bearerAuth , (req,res) => 
{
  res.status(200).json(req.user);
}); // end of user route 

/************************************************ ACL BEARER AUTH *********************************************************/
/**
 * ACL bearer auth 
 * Create permission 
 */
router.get('/carete' , bearerAuth , aclAuth('create') , (req,res) => {
  res.status(200).send(' Auth to create ');
}); // end of ACL Create route

/**
 * ACL bearer auth 
 * Update permission
 */
router.get('/update' , bearerAuth , aclAuth('update') , (req,res) => {
  res.status(200).send(' Auth to update ');
}); // end of ACL Update route

/**
 * ACL bearer auth 
 * Delete permission
 */
router.get('/delete' , bearerAuth , aclAuth('delete') , (req,res) => {
  res.status(200).send(' Auth to Delete ');
}); // end of ACL Delete route

module.exports = router;