const router = require('express').Router();
const { createTicket, getTickets, updateTicket } = require('../controllers/ticket.controller');
const { protect, requireRole } = require('../middleware/auth.middleware');

router.post('/', protect, requireRole('Employee'), createTicket);
router.get('/', protect, getTickets);
router.put('/:id', protect, requireRole('Admin'), updateTicket);

module.exports = router;