const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    company_name:String,
    materials:Object,
    email:String,
    contact_person_name:String,
    telephone:Array,
    address:String,
    status:Number

  });

 
  const Supplier = mongoose.model('Supplier',supplierSchema)
  
  module.exports = Supplier;