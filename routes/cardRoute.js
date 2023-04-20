const express = require('express');
const router = express.Router();

const cardController = require('../controllers/cardController');

//router.get('/contact', contactController.getContactPage);
router.post(`/card`, cardController.sendCard);


module.exports = router;