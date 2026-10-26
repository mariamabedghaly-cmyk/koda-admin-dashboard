import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-slate-500 font-medium">Verifying admin permissions...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-3">
        <h2 className="text-lg font-bold text-rose-600 dark:text-rose-400">Access Denied</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          This area is restricted to administrators only. You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return children;
}
