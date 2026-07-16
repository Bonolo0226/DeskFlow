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
    <form onSubmit={handleSubmit}>
      <h2>New ticket</h2>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </div>
      <div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
      </div>
      <div>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select priority…</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <p style={{ color: 'red' }}>{errors.priority}</p>}
      </div>
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit ticket'}
      </button>
    </form>
  );
}