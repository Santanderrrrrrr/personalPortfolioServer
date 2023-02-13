const nodemailer = require("nodemailer");
const nhbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();

let mailTransporter = nodemailer.createTransport({
  //the mail transporter is what's responsible for sending mail.
  host: "mail.privateemail.com",
  port: 465,
  auth: {
    user: `${process.env.ADMIN_EMAIL}`,
    pass: `${process.env.USER_PASS}`,
  },
});

mailTransporter.use(
  "compile",
  nhbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "..", "public/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "..", "public/views"),
    extName: ".handlebars",
  })
);

const _sendMail = async (email, username, company, message) => {
  let details = {
    from: `${process.env.ADMIN_EMAIL}`,
    to: email,
    subject: "LEON OMOLLO: I GOT YOUR MESSAGE",
    text: `And I'm really glad you reached out!`,
    template: "emailReceived",
    context: {
      userEmail: email, // replace {{userName}} with provided email
      userName: username,
    },
  };
  let toLeon = {
    from: `${process.env.ADMIN_EMAIL}`,
    to: `${process.env.ADMIN_EMAIL}`,
    subject: `Email from ${username} of ${company}`,
    text: `${message.substr(0, 20)}`,
    template: "toLeon",
    context: {
      userEmail: email, // replace {{userName}} with provided email
      userName: username,
      message: message,
    },
  };
  await new Promise((resolve, reject) => {
    mailTransporter.sendMail(details, (err, info) => {
      if (err) {
        console.log(
          "nodemailer failed with the following error:",
          err.message,
          err
          );
          reject(err)
      } else {
          console.log(`email sent to ${username}`);
          resolve(info)
      }
    });
  });
  await new Promise((resolve, reject) => {
    mailTransporter.sendMail(toLeon, (err, info) => {
      if (err) {
        console.log(
          "nodemailer failed with the following error:",
          err.message,
          err
        );
        reject(err);
      } else {
        console.log("email has been sent to santanderrrrrrr@leonomollo.com");
        resolve(info);
      }
    });
  });
    
//   mailTransporter.sendMail(toLeon, (err) => {
//     if (err)
//       return console.log(
//         "nodemailer failed with the following error:",
//         err.message,
//         err
//       );
//     console.log("email has been sent to santanderrrrrrr@leonomollo.com");
//   });
};

module.exports = { _sendMail };
