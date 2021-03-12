const { Router } = require('express');

const router = Router();

const rateLimit = require("express-rate-limit");

const { MailController } = require('../controllers');
// Only allow 3 requests every 10 minutes.
router.post('/send', rateLimit({ windowMs: 10 * 60 * 1000, max: 3, message: { error: { message: 'Too many requests, please try again later.' } } }), MailController.send);

module.exports = router;