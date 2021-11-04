const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Controller = {}

Controller.sendMail = (req, res, next) =>{
   let {email, nombrePaciente, nombreDoctor, start, title, details } = req.body;
   if(!details){ details = "No hay detalles adicionales"}
    const msg = {
      "to": String(email), // Change to your recipient
      "from": "no-reply@em5140.med-aid.software", // Change to your verified sender
      "subject": "Recordatorio de tu consulta!",
     // text: "and easy to do anywhere, even with Node.js",
      //html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      "dynamicTemplateData":{
         "nombrePaciente":nombrePaciente,
         "nombreDoctor":nombreDoctor,
         "hora":start,
         "title": title,
         "details":details
      },
      "template_id":"d-59225a48b35d4b839397924a5748e05a",
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

