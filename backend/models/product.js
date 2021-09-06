const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    category:String,
    rating:Number,
    price:Number,
    colors:Array,
    description:String,
    img:String,
    material:String,
    sm:Array,
    m:Array,
    l:Array,
    xl:Array,
    xxl:Array,
    size:Array,
    pno:String,
    stock:Number


  });

 
  const Product = mongoose.model('Product',productSchema)
  
  module.exports = Product;