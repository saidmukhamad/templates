import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">App Starter</h1>
          <p className="mt-2 text-gray-600">Welcome back! Please sign in to continue</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};