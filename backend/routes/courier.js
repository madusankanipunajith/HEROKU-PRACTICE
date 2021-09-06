const express = require("express");
const router = express.Router();
const Courier = require("../models/customer");
const Orders = require("../models/orders");


/* GET users listing. */
router.post("/", function (req, res, next) {
  var arr = [2, 5, 6];
  res.send(arr);
});

router.post("/dashboard", function (req, res, next) {
  var rating = 5;
  var totalorders = 10;
  var deliveredorders = 12;
  var totaldeliveredorders = 100;
  var todaycommission = 700;
  var tobeclaimed = 17000;
  var dashboard = {
    rating: rating,
    totalorders: totalorders,
    deliveredorders: deliveredorders,
    totaldeliveredorders: totaldeliveredorders,
    todaycommission: todaycommission,
    tobeclaimed: tobeclaimed,
  };

  res.send(dashboard);
});

router.post("/todayorders", function (req, res, next) {
  let todayOrders = [];

  Orders.find({}, function (err, orders) {
    if (err) {
      console.log(err);
    }
    todayOrders = orders;
    res.send(todayOrders);
  });
});

router.post("/deliverystatus/:id", function (req, res, next) {
  Orders.findOne({ _id: req.params.id }, function (err, order) {
    if (err) {
      console.log(err);
    }

    res.send(order);
    
  });
});

router.post("/viewcustomer/:id", function (req, res, next) {
  Orders.findOne({ _id: req.params.id }, function (err, order) {
    if (err) {
      console.log(err);
    }

    res.send(order);
    
  });
});

router.post("/updatestatus/:id", function (req, res, next) {
  Orders.updateOne({ _id: req.params.id },{'shipTo.status':1},function (err, order) {
    if (err) {
      console.log(err);
    }

    res.send(order);
    
  });
});

router.post("/deliverystatus/update/:id", function (req, res, next) {
  console.log(req.body)
  Orders.updateOne({ _id: req.params.id }, req.body, function (error, status) {
    if (error) {
      throw error;
    } else {
      res.send(status);
    }
  });
});

router.post("/submit", function (req, res, next) {
  console.log(req.body)
  res.send("OK")
});

router.post("/ratingreport", function (req, res, next) {
  Customer.find({usertype: 1}).then((customerData)=>{
    var gender = [];
    var cgr= [];
    gender = customerData.map((customer)=>{
        return customer.gender;
    })

    const male = gender.filter((gen)=> {return gen === "Male"}).length;
    const female = gender.filter((gen)=> {return gen === "Female"}).length;

    cgr.push({name: "Male", value: male});
    cgr.push({name: "Female", value: female});

    res.send(cgr);

}).catch((e)=>{
    res.status(500).send('Internal error')
})
});

router.post("/deliveryreport", function (req, res, next) {
  var arr = [2, 5, 6];
  res.send(arr);
});

router.post("/profile", function (req, res, next) {
  Courier.findOne({ _id: req.user.id }, function (error, courier) {
    if (error) {
      throw error;
    } else {
      res.send(courier);
    }
  });
});




router.post("/profile/update", function (req, res, next) {
  console.log(req.files); // the file comes here
    var file = req.files.file
    console.log(req.body);

    var newCourier = {
        ...req.body,
        img: req.files.file.name // the image name is file
    } 
  Courier.updateOne({ _id: req.user.id }, req.body,newCourier, function (error, courier) {
    if (error) {
      throw error;
    } else {
      file.mv('public/files/courier/'+file.name,function(err){
        // store the files in public/files folder, the file can be accessed via localhost:5000/files/{fileName}
        if(err) {
            res.sendStatus(500);
            throw err
        }
        else {
            res.send(courier);
        }

    });
      
    }
  });
});

/* Re use this code for file upload  */
router.post('/upload',function(req,res,next){
  var x = req.files.filename // get a single file from the request named fileName
  var fileName = x.name; // get file name
  x.mv('public/files/'+fileName,function(err){
      // store the files in public/files folder, the file can be accessed via localhost:5000/files/{fileName}
      if(err) {
          res.sendStatus(500);
          throw err
      }
      else res.sendStatus(200);

  });
  

})

module.exports = router;
