'use strict';

// make request to github API to do the handshake with it 
const superagent = require('superagent');
const users = require('./users.js');
const dotenv = require('dotenv');
dotenv.config();

/************************************************ HANDSHAKE PROCESS **********************************************************/

// url that github tells us to make request to it to get the access token 
const tokenAccessURL = 'https://github.com/login/oauth/access_token';

// API accessing 
const remoteAccessAPI = 'https://api.github.com/user';

// inside .env file 
const CLIENT_ID = process.env.CLIENT_ID;
console.log('CLIENT_ID : ', CLIENT_ID);

const CLIENT_SECRET = process.env.CLIENT_SECRET;
console.log('CLIENT_SECRET : ', CLIENT_SECRET);

// create an app on github through this route  
const SERVER_API = process.env.SERVER_API;
console.log('SERVER_API : ', SERVER_API);


/**
 * run all async function as we created as below 
 */
module.exports = async function authorize(req,res,next){
  try{
    // the code here from login page 
    let code = req.query.code;
    console.log('code in authorize function : ', code);

    // give code to take token 
    let remoteToken = await tokenInsteadOfCode(code);
    console.log('remoteToken in authorize function : ', remoteToken);

    let remoteUser = await userInfoRemotely(remoteToken);
    console.log('remoteUser in authorize function : ', remoteUser);

    let [user,token] = await getUserInfo(remoteUser);
    req.user = user;
    req.token = token;
    console.log('[user,token] in authorize function : ',req.user , req.token);

    next();
  }
  catch(err) {
    next(' error in authorize function' , err);
  }

}; // end of authorize function 


/**
 * give github code to get token
 * @param {string} codeEx 
 */
async function tokenInsteadOfCode(codeEx){
  // pass response object , remote call by using .post , then used .send superagent method to send information inside a post req.body 
  let tokenGivenRes = await superagent.post(tokenAccessURL).send({
    // pass the code to get token , code ( some chars and numbers )
    code :codeEx ,
    client_id : CLIENT_ID ,
    client_secret : CLIENT_SECRET,
    redirect_uri: SERVER_API,
    // access type we want 
    grant_type : 'authorization_code',
  }); // end of tokenGivenRes object 

  console.log('tokenGivenRes : ', tokenGivenRes);

  // we sent the code and the needed information so once superagent returned back the data we will take the access token we need 
  let access_token = tokenGivenRes.body.access_token;
  console.log('accessToken : ', access_token);

  return access_token;
} // end of tokenInsteadOfCode function 


/**
 * to get all my user info( username & password ) once I gave github my token 
 * @param {string} token 
 */
async function userInfoRemotely(token){
  // .set superagent method used to set headers ( user level , express app , need authorization , give it my token )
  let userRes = await superagent.get(remoteAccessAPI)
    .set('user-agent','express-app')
    .set('Authorization',`token ${token}`);

  // username and password 
  console.log('userRes : ', userRes);

  // what kind of data I need , jest user Info and as I asked as above in userRes , limit the user response 
  let user = userRes.body;
  console.log('user : ', user);
  return user;
} // end of userInfoRemotely function 


async function getUserInfo(remoteUser){
  let userRecInfo = {
    username : remoteUser.login,
    // security password 
    password : 'fakepassword',
  };
  console.log('userRecInfo : ', userRecInfo);

  let user = await users.save(userRecInfo);
  console.log('user OAUTH : ', user);

  let token = users.genToken(user);
  console.log('token OAUTH : ', token);

  return [user,token];

} // end of userInfo function 
