export default function StatusBadge({ status }) {
  const colors = { Open: 'gray', 'In Progress': 'orange', Resolved: 'green' };
  return <span style={{ color: colors[status], fontWeight: 600, fontSize: 13 }}>● {status}</span>;
}