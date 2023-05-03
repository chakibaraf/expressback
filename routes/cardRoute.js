const express = require('express');
const router = express.Router();

const cardController = require('../controllers/cardController');


router.post(`/articles/cards`, cardController.sendCard);


module.exports = router;