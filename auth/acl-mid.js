'use strict';

const users = require('./users.js');

// get the cap from ACL route 
module.exports = (cap) =>
{
    return (req,res,next) =>{
        try {
            if(req.users.capabilities.includes(cap)){
                next();
            } else {
                next(' Access Denied For This User ');
            }
        } // end of try
        catch(err) {
            next(' invalid login ACL auth ' , err);
        } // end of catch 
    } // end of return 
} // end of middleware for CAP 