const nodemailer = require('nodemailer');

exports.sendMail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail ',
    authMethod: 'PLAIN',
    auth: {
      user: 'contact.test1520',
      pass: 'jouhdmqndezmteqi',
    },
  });
  await transporter.sendMail(mailOptions);
};