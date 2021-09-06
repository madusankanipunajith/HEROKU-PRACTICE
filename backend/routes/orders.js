var express = require('express');
var router = express.Router();
const Order = require('../models/orders')

/* GET users listing. */
router.post('/addorder', function(req, res, next) {

  const neworder = new Order(req.body)

  neworder.save((err,result)=>{
    if(err) throw err
    else{
      res.sendStatus(200)

    }
  })
  
});

module.exports = router;
