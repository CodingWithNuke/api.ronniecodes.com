const { Router } = require('express');

const router = Router();

const { MailController } = require('../controllers');
router.post('/send', MailController.send);

module.exports = router;