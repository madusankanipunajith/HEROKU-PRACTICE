const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    name:String,
    email:String,
    date:String,
    time:String,
    subject:String,
    body:String,
    status:Number
});

const Complaint = mongoose.model('complaint',complaintSchema)
  
  module.exports = Complaint;

