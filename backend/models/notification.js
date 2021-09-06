const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    fromId:String,
    toId:String,
    message:String,
    link:String,
    type:Number,
    readed:Number

});

const Notification = mongoose.model('Notification',notificationSchema)
  
module.exports = Notification;