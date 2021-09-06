const express = require("express");
const router = express.Router();

//model imports
const Materials = require("../models/materials");
const Products = require("../models/product");
const Users = require("../models/customer");
const Suppliers = require("../models/supplier");
const Orders = require("../models/orders");

/* GET users listing. */
router.post("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/dashboard", function (req, res, next) {
    // if(req.isAuthenticated()){
    Users.find({}, "usertype", function (usrerr, userData) {
        if (usrerr) throw usrerr;
        else {
            Orders.find({}, "amount", function (odrerr, orderData) {
                if (odrerr) throw odrerr;
                else {
                    Suppliers.find({}, "_id", function (superr, supplyData) {
                        if (superr) throw superr;
                        else {
                            var dashboardData = {
                                customerCount: userData.filter((users) => {
                                    return users.usertype === 1;
                                }).length,
                                supervisorCount: userData.filter((users) => {
                                    return users.usertype === 2;
                                }).length,
                                curiorCount: userData.filter((users) => {
                                    return users.usertype === 3;
                                }).length,
                                supplierCount: supplyData.length,
                                sales: orderData.length,
                                orderCost: 15000,
                                otherCost: 2435,
                            };

                            res.send(dashboardData);
                        }
                    });
                }
            });
        }
    });
});

router.post("/set-order-status", (req, res, next) => {
    var x = req.body;
    console.log(x);
    Materials.updateOne({ id: x.id }, x, (err, docs) => {
        console.log(err, docs);
    });
    res.sendStatus(200);
});

//get Orders
router.post("/getOrders", (req, res, next) => {
    Orders.find({}, (err, docs) => {
        let orders = docs;
        if (err) {
            console.log(err);
        }
        res.send(orders);
        console.log(orders.length + " documents sent from orders collection");
    });
});

//get delivery persons
router.post("/getCouriers", (req, res, next) => {
    Users.find({ usertype: 3 }, (err, docs) => {
        if (err) {
            console.log(err);
        }
        res.send(docs);
        console.log(docs.length + " delivery person records sent");
    });
});

//get materials
router.post("/get-materials", (req, res, next) => {
    Materials.find({}, (err, docs) => {
        let materials = docs;
        res.send(materials);
    });
});

//get products
router.post("/get-products", (req, res, next) => {
    Products.find({}, (err, docs) => {
        let materials = docs;
        res.send(materials);
    });
});

//get a single order by ID from orders
router.post("/get-order/:id", (req, res, next) => {
    Orders.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            console.log(err);
        }
        res.send(order);
        console.log(
            "One document sent from orders collection with id : " + order.id
        );
    });
});

//get a single order by ID from orders
router.post("/accept-order/:id", (req, res, next) => {
    var formData = req.body;
    Orders.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            console.log(err);
            res.send(status);
        } else {
            //updating status of the order document (to "accepted")
            order.status = formData.status;
            //updating total price label for entire order
            order.orderAmount = formData.price;
            order.totalAmount = order.orderAmount+order.deliveryPrice;
            order.items.forEach((item, index) => {
                //record material cost for each item in order document
                item.material.cost = parseInt(formData.costs[index]);
                //reduce materials from warehouse
                console.log(index+" : "+item.material.cost);
            });

            Orders.updateOne(
                { _id: req.params.id },
                order,
                (updateErr, result) => {
                    if (updateErr) {
                        console.log(updateErr);
                        res.send(status);
                    } else {
                        res.send(result);
                    }
                }
            );
        }
    });
});

module.exports = router;
