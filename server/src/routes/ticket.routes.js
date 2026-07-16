const router = require('express').Router();
const { createTicket, getTickets, updateTicket } = require('../controllers/ticket.controller');
const { protect, requireRole } = require('../middleware/auth.middleware');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth: { type: http, scheme: bearer, bearerFormat: JWT }
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a ticket (Employee only)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, priority]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               priority: { type: string, enum: [Low, Medium, High] }
 *     responses:
 *       201: { description: Ticket created }
 *       400: { description: Missing/invalid fields }
 *       403: { description: Wrong role }
 */

router.post('/', protect, requireRole('Employee'), createTicket);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get tickets (Employees see only their own, Admins see all)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of tickets }
 */

router.get('/', protect, getTickets);

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update ticket status (Admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [Open, "In Progress", Resolved] }
 *     responses:
 *       200: { description: Ticket updated }
 *       403: { description: Wrong role }
 *       404: { description: Ticket not found }
 */

router.put('/:id', protect, requireRole('Admin'), updateTicket);

module.exports = router;