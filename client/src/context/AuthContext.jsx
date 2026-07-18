import { useState } from 'react';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, role, token }

  const login = (userData) => {
    localStorage.setItem('deskflow_token', userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('deskflow_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};