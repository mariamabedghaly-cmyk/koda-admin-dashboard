import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import ENDPOINTS from '../api/endpoints';
import Skeleton from '../components/common/Skeleton';
import { useToast } from '../context/ToastContext';

export default function AdminCartsPage() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error: toastError } = useToast();

  const loadCarts = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.get(ENDPOINTS.ADMIN_ORDERS.CARTS);
      setCarts(data.carts || data.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to load active carts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCarts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Active Shopping Carts
        </h2>
        <p className="text-xs text-slate-500">
          Monitor open carts and identify abandoned checkout sessions
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : carts.length > 0 ? (
          <div className="space-y-4">
            {carts.map((c) => (
              <div key={c._id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Cart #{c._id?.slice(-8)}
                  </p>
                  <p className="text-xs text-slate-500">
                    Items count: {c.items?.length || 0}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 dark:text-white">
                    ${Number(c.totalPrice || 0).toFixed(2)}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-8">
            No active customer carts currently in session.
          </p>
        )}
      </div>
    </div>
  );
}
