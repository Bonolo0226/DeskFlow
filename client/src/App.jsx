import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import LoginPage from './pages/LoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';


export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/employee"
        element={user?.role === 'Employee' ? <EmployeeDashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/admin"
        element={user?.role === 'Admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}