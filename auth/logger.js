'use strict';

/**
 * print out the method and route name once server start 
 */
module.exports = (req, res, next) => {
  console.log(' request Information => ',req.method, req.path);
  next();
};