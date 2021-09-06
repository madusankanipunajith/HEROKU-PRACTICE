const nodemailer = require("nodemailer");

async function send(to,message,subject) {
  
  let transporter = nodemailer.createTransport({
   service:'gmail',
    auth: {
      user: 'curvesstitches@gmail.com', // generated ethereal user
      pass: 'Mmkhuvin', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Stitches & Curves" <curvesstitches@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: message
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = send;