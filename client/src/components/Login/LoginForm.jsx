import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Employee');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
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
      login({ ...data.user, token: data.token });
      navigate(role === 'Employee' ? '/employee' : '/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__content">
        <div className="login-page__brand">
          <span className="login-page__brand-mark">DESKFLOW</span>
          <h1 className="login-page__brand-heading">Internal IT service requests, handled properly.</h1>
          <p className="login-page__brand-sub">
            Submit a ticket, track its status, and get IT admins the context they need — all in one place.
          </p>
          <div className="login-page__feature-list">
            <div className="login-page__feature"><span className="login-page__feature-dot" /> Role-based access for employees and admins</div>
            <div className="login-page__feature"><span className="login-page__feature-dot" /> Live status tracking, no email chains</div>
            <div className="login-page__feature"><span className="login-page__feature-dot" /> Priority-flagged for faster triage</div>
          </div>
        </div>

        <div className="login-page__form-panel">
          <form onSubmit={handleSubmit} className="login-card">
            <div>
              <span className="login-card__brand">DESKFLOW</span>
              <h1 className="login-card__heading">Sign in</h1>
              <p className="login-card__subtext">Simulated login — pick a role to test the view.</p>
            </div>

            <div className="login-card__field">
              <label className="login-card__label" htmlFor="name">Name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>

            <div className="login-card__field">
              <span className="login-card__label">Role</span>
              <div className="role-toggle">
                {['Employee', 'Admin'].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`role-toggle__btn ${role === r ? 'role-toggle__btn--active' : ''}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="ticket-form__error">{error}</p>}

            <button type="submit" disabled={submitting} className="btn">
              {submitting ? 'Signing in…' : `Continue as ${role}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}