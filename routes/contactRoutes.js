const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/fichier/html', contactController.getContactPage);
router.post('/fichier/html', contactController.sendContactForm);


module.exports = router;