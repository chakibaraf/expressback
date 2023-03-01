const mailService = require('../services/mailService');
const path = require('path');

exports.getContactPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/page.html'));
};

exports.sendContactForm = async (req, res) => {
  try {
    if (!req.body.email || !req.body.message) {
      const errorMessage = 'Veuillez remplir tous les champs requis.';
      return res.status(400).redirect(`/fichier/html?message=${encodeURIComponent(errorMessage)}`);
    }

    const mailOptions = {
      from: 'contact.test1520',
      to: 'araf.chakib.m@gmail.com',
      subject: 'Demande de contact',
      html: `<h1>Nouveau message</h1>
        <p>Email: ${req.body.email}</p>
        <p>Message: ${req.body.message}</p>,
        <p>Sujet: ${req.body.sujet}</p>`,
    };
    await mailService.sendMail(mailOptions);
    res.send('Formulaire traité');
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur est survenue');
  }
};