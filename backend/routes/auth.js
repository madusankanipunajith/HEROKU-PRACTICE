var express = require('express');
const passport = require('passport');
var router = express.Router();
require('../components/database')
require('../components/passport-config')(passport);




/* GET home page. */
router.post('/isauth',function(req,res,next){
    if(req.isAuthenticated()){

        res.send({isAuth:true,id:req.user,authType:req.user.usertype})
    }
    else{  
        res.send({isAuth:false}) 
    }
 
})



router.post('/',passport.authenticate('local'), function (req, res, next) {

 

    res.send({auth:req.isAuthenticated(),authType:req.user.usertype})
 
    //res.send({auth:true}) 

});


router.post('/logout',function (req, res, next) {

 
    req.logOut()
    res.sendStatus(200)
 
    //res.send({auth:true}) 

});








module.exports = router;
