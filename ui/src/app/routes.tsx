import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/main-layout';
import { AuthLayout } from './layouts/auth-layout';
import { Dashboard } from '@pages/dashboard';
import { Products } from '@pages/products';
import { Login } from '@pages/login';

const Analytics = () => <div className="p-8"><h1 className="text-3xl font-bold">Analytics</h1></div>;
const Users = () => <div className="p-8"><h1 className="text-3xl font-bold">Users</h1></div>;
const Settings = () => <div className="p-8"><h1 className="text-3xl font-bold">Settings</h1></div>;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true; // Replace with actual auth logic
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
