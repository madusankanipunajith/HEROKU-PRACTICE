var express = require('express');
var router = express.Router();
const Notification = require('../components/notification-config')


/* GET users listing. */
router.post('/send', function (req, res, next) {

    var notificationBody = req.body
    try {
        Notification.send(notificationBody)
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(500)
    }

});

router.post('/recieve', function (req, res, next) {

    var toId = 2 // get this id from req.user.id

    Notification.recieve(toId).then((notifications) => {
        res.send(notifications)

    }).catch((err) => {
        res.sendStatus(500)
    })
    // res.send(allNotifications);


});

module.exports = router;
