var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('supplier.ejs')
});
router.get('/success', function (req, res, next) {
    res.render('success.ejs')
});

router.get('/reject', function (req, res, next) {
    res.render('reject.ejs')
});

module.exports = router;
