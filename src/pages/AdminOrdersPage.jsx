import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import ENDPOINTS from '../api/endpoints';
import StatusBadge from '../components/admin/StatusBadge';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import { useToast } from '../context/ToastContext';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('shipped');
  const [adminNote, setAdminNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const { success, error: toastError } = useToast();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.get(ENDPOINTS.ADMIN_ORDERS.ALL);
      setOrders(data.orders || data.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setUpdating(true);
    try {
      await axiosClient.patch(ENDPOINTS.ADMIN_ORDERS.UPDATE_STATUS(selectedOrder._id), {
        status: newStatus,
        adminNote,
      });
      success(`Order status updated to ${newStatus}`);
      setSelectedOrder(null);
      loadOrders();
    } catch (err) {
      toastError(err.message || 'Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Orders Management
        </h2>
        <p className="text-xs text-slate-500">
          Track customer shipments, process payments, and update delivery status
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-primary-600">
                        #{order._id?.slice(-8)}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {order.user?.email || order.shippingAddress?.city || 'Customer'}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        ${Number(order.totalPrice || order.totalAmount || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.status || 'shipped');
                          }}
                        >
                          Update Status
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-xs text-slate-400">
                      No customer orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Update Order #${selectedOrder?._id?.slice(-8)}`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
              Cancel
            </Button>
            <Button size="sm" loading={updating} onClick={handleUpdateStatus}>
              Save Status
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select New Order Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Admin Note for Customer
            </label>
            <textarea
              rows={3}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="e.g. Shipped via Aramex - Tracking #123456"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
