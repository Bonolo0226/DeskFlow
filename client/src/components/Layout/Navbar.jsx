import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">DF</span>
        <span className="navbar__name">DeskFlow</span>
        {user && <span className="role-badge">{user.role}</span>}
      </div>
      <div className="navbar__right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {user && (
          <>
            <div className="navbar__user">
              <span className="avatar">{initial}</span>
              <span className="navbar__username">{user.name}</span>
            </div>
            <button className="btn btn--ghost" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}