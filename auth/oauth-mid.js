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
 * give github code to get token
 * @param {string} codeEx 
 */
async function tokenInsteadOfCode(codeEx){
    // pass response object , remote call by using .post , then used .send superagent method to send information inside a post req.body 
    let tokenGivenRes = await superagent.post(tokenAccessURL).send({
        // pass the code to get token , code ( some chars and numbers )
        code :code ,
        client_id : CLIENT_ID ,
        client_secret : CLIENT_SECRET,
        redirect_uri: SERVER_API,
        // access type we want 
        grant_type : 'authorization_code'
    }); // end of tokenGivenRes object 

    console.log('tokenGivenRes : ', tokenGivenRes);

    // we sent the code and the needed information so once superagent returned back the data we will take the access token we need 
    let accessToken = tokenGivenRes.body.access_token;
    console.log('accessToken : ', accessToken);

    return accessToken;
} // end of tokenInsteadOfCode function 

