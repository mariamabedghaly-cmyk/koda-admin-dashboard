import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import AdminLoginPage from '../pages/AdminLoginPage';
import DashboardOverview from '../pages/DashboardOverview';
import AdminProductsPage from '../pages/AdminProductsPage';
import AdminOrdersPage from '../pages/AdminOrdersPage';
import AdminUsersPage from '../pages/AdminUsersPage';
import AdminCartsPage from '../pages/AdminCartsPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminRoute from './AdminRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="carts" element={<AdminCartsPage />} />
        <Route
          path="settings"
          element={
            <div className="p-8 text-center text-sm text-slate-500">
              Admin settings panel (Theme, API Keys, Store Preferences)
            </div>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
