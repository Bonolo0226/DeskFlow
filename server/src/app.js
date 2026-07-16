const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();                         

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'DeskFlow API', version: '1.0.0' },
    servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }],
  },
  apis: ['./src/routes/*.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

module.exports = app;