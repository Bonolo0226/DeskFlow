const STATUSES = ['Open', 'In Progress', 'Resolved'];

export default function StatusDropdown({ value, onChange, disabled }) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="status-dropdown"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}