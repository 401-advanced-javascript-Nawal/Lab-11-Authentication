'use strict';

const Schema = require('./schema.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 8080;

const MONGOOSE_URI = 'mongodb://localhost:27017/auth'
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

dotenv.config();

// use logger 
const loggerReq = require('./auth/logger.js');
app.use(loggerReq);

app.use(express.json());
app.use(morgan('dev'));

// Auth 
// const basicAuth = require('./basic-mid-auth.js');
const User = require('./auth/users.js');
// console.log('User : ', User);
// console.log('schema : ', schema);

// errors 
// const err404 = require('../middleware/404.js');
// const err500 = require('../middleware/500.js');
// app.use(err404);
// app.use(err500);

let ss = new Schema();
console.log('ss : ', ss);

 async function saveuser (userObjInfo){

    // check if the user on our db 
    console.log('userObjInfo Before  : ', userObjInfo);
    if(!user.find(userObjInfo)){
        console.log('ss.find(userObjInfo.username) : ', ss.find(userObjInfo));
        // hash the password and save it on our db by username object 
        // 5 it is the complexity or salt for hash complication hashing 
        userObjInfo.password = await bcryptjs.hash(userObjInfo.password,5);

        // save the whole userinfo( username, password ) into DB by the username 
        ss.save(userObjInfo) = userObjInfo;

        console.log('userObjInfo After  : ', userObjInfo);
        return userObjInfo;
    } // end of if statement 

    // return Promise.reject();
    return 'Not Valid';

} // end of users save function 

let testObj = {username:'nawal',password : 123456};
saveuser(testObj);
/*********************************************** Routes ******************************************************/

// app.post('/signup',(req,res) =>
// {
//     users.save(req.body)
//     .then(user => {
//       let token = users.genToken(user);
//       res.status(200).send(token);
//     })
//     .catch(err => console.error(err));

// }); // end of signup route 

// app.post('/signin',basicAuth,(req,res) =>
// {
//     res.status(200).send(req.token);
// }); // end of signup route 

// // out all users list in db 
// app.get('/users',basicAuth,(req,res) =>
// {
//     res.status(200).json(users.list);
// }); // end of signup route 


// Server listening 

app.listen(PORT, () => console.log(`The App Is a live and Listening on Port No.${PORT}`));



