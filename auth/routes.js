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

/************************************************ API Server *********************************************************/
const catMod = require('../models/categories-mod/categories-model.js');
const proMod = require('../models/products-mod/products-model.js');

// makes the products and categories route generic 
function modelName(req, res, next) {
  // make the model name generic globally 
  let model = req.params.model;

  // to modify the middleware request 
  switch (model) {
  // api/v1/modelN === api/v1/categories 
  case 'categories':
    req.model = catMod;
    next();
    return;

    // api/v1/modelN === api/v1/produts 
  case 'products':
    req.model = proMod;
    next();
    return;

    // if the model name invalid , the middleware error will occars 
  default:
    next(' This model Name Not Exist');
    return;

  } // end of switch statement 

} // end of modelname function 


// request params ( :modelN )
router.param('model', modelName);

// dynamic routes  
router.get('/api/v1/:model', getAll);
router.get('/api/v1/:model/:id', getOne);
router.post('/api/v1/:model',postOne);
// router.update('/api/v1/:model/:id', updateOne);
// router.delete('/api/v1/:model/:id', deleteOne);

/**
 * retrieve all data 
 * @param {object} req 
 * @param {object} res 
 * @param {MM} next 
 */
function getAll(req, res, next) {

  req.model.get()
    .then(data => {
      let count = data.length;
      res.status(200).json({ count, data });
    })
    .catch(next);
} // end of getAll function 

/**
 * retreive one item 
 * @param {object} req 
 * @param {object} res 
 * @param {MM} next 
 */
function getOne(req, res, next) {
  let id = req.param.id;
  req.model.get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
} // end of getOne function

/**
 * create new item 
 * @param {object} req 
 * @param {object} res 
 * @param {MM} next 
 */
function postOne(req, res, next) {
  console.log('req.body : ', req.body);
  req.model.post(req.body)
    .then( data =>
    {
      res.status(201).json(data);
    })
    .catch(next);
} // end of postOne function

/**
 * 
 * @param {Object} req 
 * @param {object} res 
 * @param {MM} next 
 */
function updateOne(req, res, next) {
  let id = req.param.id;
  req.model.update(id,req.body)
    .then( data =>
    {
      res.status(200).json(data);
    })
    .catch(next);
} // end of updateOne function

/**
 * remove one item 
 * @param {Object} req 
 * @param {object} res 
 * @param {MM} next 
 */
function deleteOne(req, res, next) {
  let id = req.param.id;
  req.model.delete(id)
    .then( data =>
    {
      res.status(200).json(data);
    })
    .catch(next);
} // end of deleteOne function


/************************************************ Errors **************************************************************/
/**
 * 
 * @param {Object} error 
 * @param {Object} req 
 * @param {Object} res 
 * @param {MM} next 
 */
function errorHander(error, req, res, next) {
  res.status(500);
  res.statusMsg = 'Server Error ';
  res.json({ error: error });
} // end of errorHander function 

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {MM} next 
 */
function notFoucnError(req, res, next) {
  res.status(404);
  res.statusMsg = ' Not Found ';
  res.json({ error: ' Not Found ' });
} // end of notFoucnError function 

/**
 * real time error 
 */
router.get('/gen-error', (req, res) => {
  throw new Error(' Real-Time Error ');
}); // end of get error  



module.exports = router;