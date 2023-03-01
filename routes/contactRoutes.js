const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/fichier/html', contactController.getContactPage);
router.post('/fichier/html', contactController.sendContactForm);

/*router.use((req, res) => {
  res.status(404).send('Page non trouvée');
});
*/
module.exports = router;