const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    name: 'RonnieCodes.com API',
    version: '0.0.1-beta.0',
    server_time: Date.now()
  })
})

module.exports = router;