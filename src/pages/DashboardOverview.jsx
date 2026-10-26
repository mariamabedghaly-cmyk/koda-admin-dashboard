import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DollarSign,
  ShoppingBag,
  Package,
  RefreshCw,
  Heart,
} from 'lucide-react';
import StatCard from '../components/admin/StatCard';
import StatusBadge from '../components/admin/StatusBadge';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import { useToast } from '../context/ToastContext';

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [wishlistStats, setWishlistStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error: toastError } = useToast();

  const loadDashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const ordersRes = await axios.get(
        'https://e-commerce-api-3wara.vercel.app/orders/admin/dashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(ordersRes.data?.dashboard || ordersRes.data || {});

      const wishRes = await axios.get(
        'https://e-commerce-api-3wara.vercel.app/wishlists/admin/stats',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlistStats(wishRes.data?.statistics || wishRes.data || {});
    } catch (err) {
      toastError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time sales, order fulfillment, and inventory analytics
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={RefreshCw}
          loading={loading}
          onClick={loadDashboardData}
        >
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={loading ? '...' : `$${Number(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          trend="+14% this month"
          color="emerald"
        />
        <StatCard
          title="Total Orders"
          value={loading ? '...' : stats?.totalOrders ?? '0'}
          icon={ShoppingBag}
          trend="+8% from last week"
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={loading ? '...' : stats?.totalProducts ?? '0'}
          icon={Package}
          color="amber"
        />
        <StatCard
          title="Saved to Wishlist"
          value={loading ? '...' : wishlistStats?.totalWishlistProducts ?? '0'}
          icon={Heart}
          color="purple"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Recent Orders
          </h3>
          <span className="text-xs text-slate-400">Latest customer orders</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {stats?.recentOrders?.length > 0 ? (
                  stats.recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs text-primary-600 font-semibold">
                        #{order._id?.slice(-6)}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        ${Number(order.totalAmount || order.totalPrice || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-xs text-slate-400">
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
