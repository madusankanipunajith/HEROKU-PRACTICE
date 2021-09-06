const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    province:String
});

const Province = mongoose.model('Province', provinceSchema);

module.exports = Province;
