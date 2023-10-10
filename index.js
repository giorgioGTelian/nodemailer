import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const secretPassword = process.env['SECRET_PASSWORD'];
const secretUser = process.env['SECRET_USER'];
const secretSender = process.env['SECRED_SENDER'];
const secretHost = process.env['SECRET_HOST'];


// Enable JSON parsing middleware for POST requests
app.use(express.json());
 
// Define a route for handling POST requests
app.post('/send-email', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: secretHost,
    port: 587,
    secure: false,  // true for 465, false for other ports
    auth: {
      user: secretUser,
      pass: secretPassword
    },
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/sendEmail', (req, res) => {
  const mailOptions = {
    from: secretSender,
    to: req.body.to,  // Get recipient's email from request body
    subject: 'Contact Form Submission',
    text: req.body.message  // expecting a 'message' field in the request body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully.');
    }
  });
});

app.listen(3000, () => {
  console.log('Express server initialized');
})});