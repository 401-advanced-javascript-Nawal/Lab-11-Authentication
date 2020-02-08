'use strict';

// const mongoose = require('mongoose');

// service to encrypt the password 
const bcryptjs = require('bcryptjs');

// make the output as a json format and gives it a unique char to our input with something secret to our app 
const jwt = require('jsonwebtoken');

// let SECRET='NAR9288';
// const dotenv = require('dotenv');
// dotenv.config();

// save all users
let db = {};

// each user information 
let users = {};

// const users = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//   });
// console.log('users : ', users);

// for sign Up
users.save = async function(userObjInfo){

  // check if the user on our db 
  if(!db[userObjInfo.username]){
    // hash the password and save it on our db by username object 
    // 5 it is the complexity or salt for hash complication hashing 
    userObjInfo.password = await bcryptjs.hash(userObjInfo.password,5);

    // save the whole userinfo( username, password ) into DB by the username ( object of object )
    db[userObjInfo.username] = userObjInfo;

    return userObjInfo;
  } // end of if statement 

  return Promise.reject();

}; // end of users save function 


// For sign In 
// give auth to user 
users.authenticateUser = async function(user,pass){
  // bring the user's data from DB then check the validity of it 
  let valid = await bcryptjs.compare(pass,db[user].password);
  console.log('valid : ', valid);
  // if user exist  return it , otherwise reject 
  return valid ? db[user]:Promise.reject();
}; // end of authenticateUser function 

// for both ( signin & signup )
// generate a new token 2-Factor Layer 
users.genToken = function(user){
  let token = jwt.sign({ username:user.username},process.env.SECRET);
  console.log('token : ', token);
  // return token to be able to access all layers of our app 
  return token;
}; // end of genToken function 

// make the db as a property from users 
users.list = () => db;

module.exports = users;