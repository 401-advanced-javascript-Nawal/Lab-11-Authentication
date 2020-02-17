'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
        * retrieve a record 
        * @param {string} _id 
        */
  get(id) {
    if (id) {
      return this.schema.findById(id);
    } else {
      return this.schema.find({});
    }
  } // end of get method 

  /**
     * add new record 
     * @param {object} record 
     */
  post(Rec) {
    let newRec = new this.schema(Rec);
    return newRec.save();
  } // end of post method 

  /**
     * update an existing record by ID 
     * @param {string} id 
     * @param {object} Rec 
     */
  update(id,Rec) {
    return this.schema.findByIdAndUpdate(id, Rec, { new: true });
  } // end of update method


  /**
       * remove an revord by ID 
       * @param {string} id 
       */
  delete(id) {
    return this.schema.findByIdAndDpdate(id);
  } // end of delete method


} // end of model class 


module.exports = Model;