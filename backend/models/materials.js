const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    
    name:String,
    description:String,
    level:Number,
    units:Number,
    colors:Array,
    img:String,
    price:Number

  });

 
  const Material = mongoose.model('Material',materialSchema)
  
  module.exports = Material;