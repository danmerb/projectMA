const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Controller = {}

Controller.sendMail = (req, res, next) =>{
   const correoDestinario = req.body.email;

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
                 "email":String(correoDestinario)
              }
           ],
           "dynamic_template_data":{
              "name":"Sample Name"
            }
        }
     ],
      template_id:"d-ce7527e14a1d41c79394b1a7b4000411",
    };

   sgMail.send(msg)
    .then(()=>{
       return res.status(200).json({estado:"enviado"})
      })
    .catch(e=>{
      return res.status(400).json({estado:String(e)})
    })
}

module.exports = Controller

