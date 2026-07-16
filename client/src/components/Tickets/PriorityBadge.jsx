export default function PriorityBadge({ priority }) {
  const colors = { Low: 'gray', Medium: 'orange', High: 'red' };
  return (
    <span style={{ color: colors[priority], border: `1px solid ${colors[priority]}`, borderRadius: 4, padding: '2px 6px', fontSize: 12 }}>
      {priority}
    </span>
  );
}