var express = require('express');
var router = express.Router();
var sendMail = require('../components/emailconfig');
var adminContactEmail = require('../emails/admin/contactMeAdmin');
var customerContactEmail = require('../emails/user/contactMeEmail');
var Customer = require('../models/customer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/email', function(req, res, next) {
  sendMail('uvininduwaraperera@gmail.com','<h1>Hi</h1>','Test Mail');
  res.send('');
});


router.post('/contact', function(req, res, next) {
  
  var senderMail = req.body.email;
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var contactNum = req.body.contact;
  var message = req.body.message;
  //console.log(senderMail);
  res.send({success:1})
  sendMail(senderMail,customerContactEmail,'Help and Support');
  sendMail('madushirenes@gmail.com',setAdminMail(senderMail,firstName,lastName,contactNum,message),'Help and Support');
  
 // res.send('');
});





const setAdminMail = (senderMail,firstName,lastName,contactNum,message) =>{

  return adminContactEmail
  .replace("#userName#",firstName+' '+lastName)
  .replace("#email#",senderMail)
  .replace("#num#",contactNum)
  .replace("#msg#",message)

}

router.post('/register', function(req, res, next) {
  
  
  const customer = {
    fName:req.body.fName,
    lName:req.body.lName,
    email:req.body.email,
    password:req.body.password
  }

  const regCustomer = new Customer(customer);
  regCustomer.save((err,customer)=>{

    if(err) return console.log(err);
    else console.log(customer);

  })

  res.send(customer);
});






module.exports = router;
