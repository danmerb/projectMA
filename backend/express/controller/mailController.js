const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Controller = {}

Controller.sendMail = (req, res, next) =>{
   const correoDestinario = req.body.email;

    const msg = {
      "to": String(correoDestinario), // Change to your recipient
      "from": "00097017@uca.edu.sv", // Change to your verified sender
      //"subject": "Sending with SendGrid is Really Fun :D",
     // text: "and easy to do anywhere, even with Node.js",
      //html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      "dynamicTemplateData":{
         "nombrePaciente":"Pasty",
         "nombreDoctor":"Lopez Guevara",
         "hora":"3pm",
         "lugar":"Hospital del diagnostico"
      },
      "template_id":"d-8f284cbd5d3442c2acb3fdf94ab1ec01",
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

