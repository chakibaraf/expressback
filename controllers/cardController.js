const mailService = require('../middleware/mailService');
const path = require('path');
require('dotenv').config();

exports.sendCard = async (req, res) => {
  try {
    const {articles, email } = req.body;
  
    const mailOptions = {
      from: process.env.PRIVATE_USER,
      to: process.env.PRIVATE_EMAIL,
      subject: 'Demande de devis ',
      html: `<h1>mise en place du devis panier </h1>
      <p> Sujet :$
      <p>email:${email}</p>,
      <p>articles: ${articles}</p>`
      
    };
    await mailService.sendMail(mailOptions);
    res.send('mail envoye');
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue' });
  }
};

