import { useEffect, useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import TicketList from '../components/Tickets/TicketList';
import api from '../services/api';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [updateError, setUpdateError] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/tickets');
      setTickets(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId, newStatus) => {
    setUpdatingId(ticketId);
    setUpdateError('');
    try {
      const { data } = await api.put(`/tickets/${ticketId}`, { status: newStatus });
      setTickets((prev) => prev.map((t) => (t._id === ticketId ? data : t)));
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Could not update ticket status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const counts = tickets.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    },
    { Open: 0, 'In Progress': 0, Resolved: 0 }
  );

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard__inner">
          <span className="dashboard__title">Deskflow</span>
          <h1 className="dashboard__heading">Admin Dashboard</h1>
          <div className="stat-strip">
            <div className="stat-chip stat-chip--open">
              <span className="stat-chip__label">Open</span>
              <span className="stat-chip__count">{counts.Open}</span>
            </div>
            <div className="stat-chip stat-chip--progress">
              <span className="stat-chip__label">In Progress</span>
              <span className="stat-chip__count">{counts['In Progress']}</span>
            </div>
            <div className="stat-chip stat-chip--resolved">
              <span className="stat-chip__label">Resolved</span>
              <span className="stat-chip__count">{counts.Resolved}</span>
            </div>
          </div>
          <TicketList
            tickets={tickets}
            loading={loading}
            error={error}
            isAdmin
            onStatusChange={handleStatusChange}
            updatingId={updatingId}
          />
        </div>
      </div>
    </div>
  );
}