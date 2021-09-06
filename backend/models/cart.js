const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:String,
    items:Array

});

const Cart = mongoose.model('Cart',cartSchema)
  
module.exports = Cart;