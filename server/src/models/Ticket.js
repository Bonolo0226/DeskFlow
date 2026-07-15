const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved'],
      default: 'Open',
    },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);