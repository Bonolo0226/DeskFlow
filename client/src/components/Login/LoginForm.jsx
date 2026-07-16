import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Employee');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TEMPORARY — Day 4 replaces this with a real API call.
    // For now, just fake a successful login so we can test routing.
    login({ name, role, token: 'fake-token-for-now' });
    navigate(role === 'Employee' ? '/employee' : '/admin');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <div>
        <button type="button" onClick={() => setRole('Employee')}>Employee</button>
        <button type="button" onClick={() => setRole('Admin')}>Admin</button>
      </div>
      <p>Selected role: {role}</p>
      <button type="submit">Continue</button>
    </form>
  );
}