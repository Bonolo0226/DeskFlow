import { useEffect, useState } from 'react';
import TicketForm from '../components/Tickets/TicketForm';
import TicketList from '../components/Tickets/TicketList';
import api from '../services/api';

export default function EmployeeDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get('/tickets');
        setTickets(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load your tickets.');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleTicketCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <TicketForm onTicketCreated={handleTicketCreated} />
      <h2>Your requests</h2>
      <TicketList tickets={tickets} loading={loading} error={error} />
    </div>
  );
}