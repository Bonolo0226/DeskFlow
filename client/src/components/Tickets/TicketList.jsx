import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import StatusDropdown from './StatusDropdown';

export default function TicketList({ tickets, loading, error, isAdmin, onStatusChange, updatingId }) {
  if (loading) return <p className="list-state">Loading tickets…</p>;
  if (error) return <p className="list-state list-state--error">{error}</p>;
  if (!tickets || tickets.length === 0) return <p className="list-state">No tickets yet.</p>;

  return (
    <div>
      {tickets.map((t) => (
        <div key={t._id} className={`ticket-card ticket-card--${t.priority.toLowerCase()}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 className="ticket-card__title">{t.title}</h3>
            <PriorityBadge priority={t.priority} />
          </div>
          <p className="ticket-card__description">{t.description}</p>
          {isAdmin && <span className="ticket-card__meta">by {t.createdBy}</span>}
          <div className="ticket-card__footer">
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