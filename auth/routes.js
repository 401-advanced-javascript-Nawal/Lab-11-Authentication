'use strict';

const express = require('express');
const router = express.Router();

const basicAuth = require('./basic-mid-auth.js');
const users = require('./users.js');


router.post('/signup',(req,res) =>
{
  users.save(req.body)
    .then(user => {
      let token = users.genToken(user);
      res.status(200).send(token);
    })
    .catch(err => console.error(err));

}); // end of signup route 

router.post('/signin',basicAuth,(req,res) =>
{
  res.status(200).send(req.token);
}); // end of signin route 

// out all users list in db 
router.get('/users',basicAuth,(req,res) =>
{
  res.status(200).json(users.list);
}); // end of signup route 

module.exports = router;