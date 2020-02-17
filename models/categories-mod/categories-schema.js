
'use strict';

const mongoose = require('mongoose');
require('../products-mod/products-schema.js');

const categories = mongoose.Schema({
  name: { type: 'string', required: true },
}, {toObject : { virtuals: true},toJSON : {virtuals :true}});

/**
 * virtual modleing for categories 
 */
// collection/model name 
categories.virtual('realPro', {
  // collection/model name (categories)
  ref : 'products',
  // name inside categories schema 
  localField : 'category',
  foreignField : 'name',
  justOne : false,
}); // end of mock categories 


/**
 * the mock(pre) function to retreive the database 
 */
// do it before starting 
categories.pre('findOne', function () {
  try {
    // the virtual name we have been created 
    this.populate('realPro');
  }
  catch (err) {
    console.error(err);
  }
}); // end of population for categories 

module.exports = mongoose.model('categories', categories);