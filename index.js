const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
  nodemailer.createTestAccount((error, account) => {
    const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.Name}</li>
            <li>Email: ${req.body.Email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.Message}</p>
        `;

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "celine48@ethereal.email",
        pass: "64D6YZzZk6BQC37w5f"
      }
    });

    let mailOptions = {
      from: "test@testaccount.com",
      to: "celine48@ethereal.email",
      replyTo: "test@testaccount.com",
      subject: "New Booking",
      text: req.body.messsage,
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
