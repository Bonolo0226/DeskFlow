import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Employee');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Enter a name to continue');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const { data } = await api.post('/auth/login', { name, role });
      localStorage.setItem('deskflow_token', data.token);
      login({ ...data.user, token: data.token });
      navigate(role === 'Employee' ? '/employee' : '/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setSubmitting(false);
    }
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Signing in…' : 'Continue'}
      </button>
    </form>
  );
}