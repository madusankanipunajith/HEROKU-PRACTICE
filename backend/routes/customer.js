var express = require('express');
var router = express.Router();
var Customer = require('../models/customer')
var Cart = require('../models/cart')
var Order = require('../models/orders')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/measurement', function (req, res, next) {

    Customer.findById(req.user.id, 'measurement', (err, result) => {
        if (err) res.sendStatus(500)
        else {
            res.send(result)
        }
    })

});

router.get('/dp', function (req, res, next) {

    if (req.isAuthenticated()) {
        Customer.findById(req.user.id, 'img', (err, result) => {
            if (err) res.sendStatus(500)
            else {
                res.send(result)
            }
        })
    }

    else {
        res.send({ id: '' })
    }

});


router.post('/measurement', function (req, res, next) {
    var measurements = req.body.measurements
    Customer.updateOne({ _id: req.user.id }, { measurement: measurements }, function (err, result) {
        if (err) res.sendStatus(500)
        else res.send(result)
    })


});

router.post('/addcart', function (req, res, next) {

    Cart.findOne({ userId: req.user.id }, function (err, userCart) {
        if (err) res.sendStatus(500)
        else {
            
            if (userCart ===null) {
                var newCart = new Cart({
                    userId: req.user.id,
                    items: req.body.items
                })
            newCart.save(function(err,cart){
                if(err) res.sendStatus(500)
                else {
                    console.log('triggered here')
                    res.sendStatus(200)
                }
            })    

            }

            else {
                Cart.updateOne({userId:req.user.id},{$push:{items:req.body.items}},function(err,cart){
                    if(err)res.sendStatus(500)
                    else res.sendStatus(200)
                })

            }
        }

    })


});

router.get('/cartitems', function (req, res, next) {
    Cart.findOne({ userId: req.user.id }, 'items', function (err, items) {
        if (err) res.sendStatus(500)
        else {
           // const editItems = Array(items.items).map(item=>({...item,item.id:''}))
            //res.send(editItems)

           
            const newItems=items.items.map((item,index)=>{
                const temp = item;
                temp['id'] = index;
                return temp
            });
            res.send({items:newItems})
        }
    })

});

router.get('/orders',function (req, res, next) {
    Order.find({'orderedBy.id':req.user.id},function(err,orders){
        if(err) res.sendStatus(500)
        else res.send(orders)
    })

})

module.exports = router;
