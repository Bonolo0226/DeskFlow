import { useEffect, useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import TicketForm from '../components/Tickets/TicketForm';
import TicketList from '../components/Tickets/TicketList';
import api from '../services/api';

export default function EmployeeDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/tickets');
      setTickets(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTicketCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard__inner">
          <span className="dashboard__title">Deskflow</span>
          <h1 className="dashboard__heading">Employee Dashboard</h1>
          <TicketForm onTicketCreated={handleTicketCreated} />
          <h2 style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 14 }}>Your requests</h2>
          <TicketList tickets={tickets} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}