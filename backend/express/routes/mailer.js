const express = require('express');
const router = express.Router();
const MailController = require("../controller/mailController")

/* GET users listing. */
router.post('/send', MailController.sendMail);

module.exports = router;
