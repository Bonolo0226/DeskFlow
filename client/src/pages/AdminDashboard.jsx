import { useEffect, useState } from 'react';
import TicketList from '../components/Tickets/TicketList';
import api from '../services/api';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get('/tickets');
        setTickets(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load tickets.');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId, newStatus) => {
    setUpdatingId(ticketId);
    try {
      const { data } = await api.put(`/tickets/${ticketId}`, { status: newStatus });
      setTickets((prev) => prev.map((t) => (t._id === ticketId ? data : t)));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update ticket status.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <TicketList
        tickets={tickets}
        loading={loading}
        error={error}
        isAdmin
        onStatusChange={handleStatusChange}
        updatingId={updatingId}
      />
    </div>
  );
}