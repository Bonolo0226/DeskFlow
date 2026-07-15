const router = require('express').Router();

router.post('/login', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.post('/register', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;