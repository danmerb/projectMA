const sgMail = require("@sendgrid/mail");
require("dotenv").config();

//console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
 // to: "", // Change to your recipient
  from: "00097017@uca.edu.sv", // Change to your verified sender
  subject: "Sending with SendGrid is Really Fun :D",
 // text: "and easy to do anywhere, even with Node.js",
  //html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  "personalizations":[
    {
       "to":[
          {
             "email":"qyc90542@zwoho.com"
          }
       ],
       "dynamic_template_data":{
          "name":"Sample Name"
        }
    }
 ],
  template_id:"d-ce7527e14a1d41c79394b1a7b4000411",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

