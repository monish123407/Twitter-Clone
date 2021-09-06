const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "unacademyams@gmail.com", // generated ethereal user
      pass: "123456789AMs", // generated ethereal password
    },
  });

  let mailTemplate= function(data,path){
      var mailerTemplate;
      ejs.renderFile(
          path.join(__dirname+"../views/mailers",path),
          data,
          function(err,template){
              if(err){
                  console.log(err);
                  return;
              }
              mailTemplate=template;
          }
      )
      return mailTemplate;
  }
  module.exports={
      transporter,
      mailTemplate,
  }