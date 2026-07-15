const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

module.exports = app;