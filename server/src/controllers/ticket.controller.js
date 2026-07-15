const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
      return res.status(400).json({ message: 'title, description and priority are required' });
    }
    if (!['Low', 'Medium', 'High'].includes(priority)) {
      return res.status(400).json({ message: 'priority must be Low, Medium, or High' });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdBy: req.user.id,
    });

    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.getTickets = async (req, res, next) => {
  try {
    const filter = req.user.role === 'Employee' ? { createdBy: req.user.id } : {};
    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    if (!['Open', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};