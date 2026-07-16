import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import StatusDropdown from './StatusDropdown';

export default function TicketList({ tickets, loading, error, isAdmin, onStatusChange, updatingId }) {
  if (loading) return <p>Loading tickets…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!tickets || tickets.length === 0) return <p>No tickets yet.</p>;

  return (
    <div>
      {tickets.map((t) => (
        <div key={t._id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{t.title}</strong>
            <PriorityBadge priority={t.priority} />
          </div>
          <p>{t.description}</p>
          {isAdmin && <p style={{ fontSize: 12, color: '#666' }}>by {t.createdBy}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <StatusBadge status={t.status} />
            {isAdmin && (
              <StatusDropdown
                value={t.status}
                disabled={updatingId === t._id}
                onChange={(newStatus) => onStatusChange(t._id, newStatus)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}