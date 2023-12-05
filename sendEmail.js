const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  console.log("asdfdsfafghadsfladshfjadhsfljka mail sent")
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "n.navedijaz480@gmail.com",
  //     pass: "ovnubtncbcoexiwb",
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  let transporter = nodemailer.createTransport({
    host: "mint-sea.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'contact@mint-sea.com', // your cPanel email address
      pass: 'ItLQ;f*}(cb-', // your cPanel email password
    },
  });


  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log("Error while send mail to the user : ", err);
    } else {
      // console.log("Info Sent", info);
    }
  });
};

module.exports = sendEmail;
