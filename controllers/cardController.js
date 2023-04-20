const mailService = require('../middleware/mailService');
const path = require('path');
require('dotenv').config();

exports.sendCard = async (req, res) => {
  try {
    const { subject, email, message, nom } = req.body;
    if (!email || !message) {
      const errorMessage = 'Veuillez remplir tous les champs requis.';
      return res.status(400).send({ error: errorMessage });
    }

    const mailOptions = {
      from: process.env.PRIVATE_USER,
      to: process.env.PRIVATE_EMAIL,
      subject: subject || 'Demande de contact',
      html: `<h1>Formulaire de contact site Internet</h1>
      <p> Sujet :${subject}
      <p>Nom: ${nom || 'Non renseigné'}</p>,
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>`
    };
    await mailService.sendMail(mailOptions);
    res.send('Formulaire traité');
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue' });
  }
};

