const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // replace with your email
      pass: process.env.EMAIL_PASSWORD // replace with your email password
    }
  });

  const mailOptions = {
    from: email,
    to: 'mahitab.elbehery@gmail.com', // your email address
    subject: `Message from ${name}`,
    text: message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent: ' + info.response);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
