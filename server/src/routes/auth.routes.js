const router = require('express').Router();
const { login } = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Simulate login and receive a role-scoped JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, role]
 *             properties:
 *               name: { type: string, example: Bonolo }
 *               role: { type: string, enum: [Employee, Admin] }
 *     responses:
 *       200: { description: Login successful }
 *       400: { description: Missing or invalid name/role }
 */

router.post('/login', login);

module.exports = router;