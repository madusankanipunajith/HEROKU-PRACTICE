const Notification = require('../models/notification')


function send(notificationBody){
    const newNotificaton = new Notification(notificationBody)
    newNotificaton["readed"] = 0;
    newNotificaton.save((err,status)=>{
        if(err) throw err;
        else return status;
    })

}


function recieve(userId){
  return new Promise((resolve,reject)=>{
    Notification.find({toId:userId}, (err,notificatons)=>{
        if(err) reject(err)
        else {
            resolve(notificatons)
          }
      })

  })
  
    // console.log(notification);
    //return notification

}

module.exports.send = send;
module.exports.recieve = recieve;