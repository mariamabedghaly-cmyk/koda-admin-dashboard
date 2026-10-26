import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashboardOverview from './pages/DashboardOverview';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminCartsPage from './pages/AdminCartsPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
        <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg">Koda Admin Dashboard</span>
            <nav className="flex gap-4 text-xs font-semibold text-slate-300">
              <Link to="/" className="hover:text-white">Dashboard</Link>
              <Link to="/products" className="hover:text-white">Products</Link>
              <Link to="/orders" className="hover:text-white">Orders</Link>
              <Link to="/users" className="hover:text-white">Users</Link>
              <Link to="/carts" className="hover:text-white">Carts</Link>
            </nav>
          </div>
          <Link to="/login" className="text-xs bg-primary-600 hover:bg-primary-700 px-3 py-1.5 rounded-lg text-white font-medium">
            Sign In
          </Link>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/carts" element={<AdminCartsPage />} />
            <Route path="/login" element={<AdminLoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
