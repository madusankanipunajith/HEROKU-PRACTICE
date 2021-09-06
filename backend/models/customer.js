const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fName:String,
    lName:String,
    nic:String,
    email:String,
    username:String,
    password:String,
    status:Number,
    telephone:String,
    telephones:Array,
    mobile:String,
    address:String,
    usertype:Number,
    organiztion:String,
    vehicles:Array,
    dob:Date,
    gender:String,
    addressObj:Object,
    rating:Number,
    img:String,
    measurement:Object

  });

 
  const Customer = mongoose.model('Customer',customerSchema)
  
  module.exports = Customer;