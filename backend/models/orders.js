const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderedBy:Object,
    date:Date,
    status:String,
    items:Array,
    shipTo:Object,
    orderAmount:Number,
    deliveryPrice:Number,
    totalAmount:Number,
    paymentMethod:String,
    paypalObj:Object,
    deliveryPerson:Object,
    deliverynote:String,
    type:Number

  });

 
  const Order = mongoose.model('Order',orderSchema)
  
  module.exports = Order;