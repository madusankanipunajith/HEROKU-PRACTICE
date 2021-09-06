const mongoose = require('mongoose');

const materialOrderSchema = new mongoose.Schema({
    ordered_items: Array,
    material:String,
    status: Number,
    price: Number,
    date: Date,
    supplier: mongoose.Schema.ObjectId
});

const MaterialOrder = mongoose.model('Materialorder', materialOrderSchema);

module.exports = MaterialOrder;