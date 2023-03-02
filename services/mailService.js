const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail ',
    authMethod: 'PLAIN',
    auth: {
      user: process.env.PRIVATE_USER,
      pass: process.env.PRIVATE_MDP,
    },
  });
  await transporter.sendMail(mailOptions);
};