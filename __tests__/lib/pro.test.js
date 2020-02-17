'use strict';

const Products = require('../../models/products-mod/products-model.js');
let products = new Products();

// const supergoose = require('./supergoose');

describe('Products Model (Modular)', () => {

  it('can create() a new product', () => {
    let obj = { name: 'bags bags', price: 25, quantity_in_stock:10,category:'bags' };
    products.post(obj)
      .then(record => {
        console.log('recorrrrrrrrrrrrrrrrrd', record);
        Object.keys(obj).forEach(key => {
          console.log('keeeeey',key);
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a product', () => {
    let obj = { name: 'bags bags', price: 25, quantity_in_stock:10,category:'bags' };
    products.post(obj)
      .then(record => {
        // console.log(record);
        products.get(record._id)
          .then(product => {
            console.log(product);
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a product', () => {
    let obj = { name: 'bags bags', price: 25, quantity_in_stock:10,category:'bags' };
    products.post(obj)
      .then(record => {
        // console.log(record);
        products.get(record._id)
          .then(product => {
            console.log(product);
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can get() all product', () => {
    let obj = { name: 'bags bags', price: 25, quantity_in_stock:10,category:'bags' };
    products.post(obj)
      .then(record => {
        // console.log(record);
        products.get(record._id)
          .then(product => {
            console.log(product);
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a product', () => {
    let obj = { name: 'bags bags', price: 25, quantity_in_stock:10,category:'bags' };
    products.post(obj)
      .then(record => {
        // console.log(record);
        products.get(record._id)
          .then(product => {
            console.log(product);
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

});