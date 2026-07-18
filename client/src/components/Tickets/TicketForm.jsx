import { useState } from 'react';
import api from '../../services/api';

export default function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!description.trim()) e.description = 'Description is required';
    if (!priority) e.priority = 'Select a priority';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setServerError('');
    setSubmitting(true);
    try {
      const { data } = await api.post('/tickets', { title, description, priority });
      onTicketCreated(data);
      setTitle('');
      setDescription('');
      setPriority('');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Could not submit the ticket.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>New ticket</h2>

      <div>
        <label className="ticket-form__label" htmlFor="title">Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. VPN won't connect" />
        {errors.title && <p className="ticket-form__error">{errors.title}</p>}
      </div>

      <div>
        <label className="ticket-form__label" htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What's happening?" />
        {errors.description && <p className="ticket-form__error">{errors.description}</p>}
      </div>

      <div>
        <label className="ticket-form__label" htmlFor="priority">Priority</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select priority…</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <p className="ticket-form__error">{errors.priority}</p>}
      </div>

      {serverError && <p className="ticket-form__error">{serverError}</p>}

      <button type="submit" disabled={submitting} className="btn">
        {submitting ? 'Submitting…' : 'Submit ticket'}
      </button>
    </form>
  );
}