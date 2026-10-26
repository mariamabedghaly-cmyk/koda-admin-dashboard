import React, { useEffect, useState } from 'react';
import { UserCheck, Shield, RefreshCw } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import ENDPOINTS from '../api/endpoints';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import { useToast } from '../context/ToastContext';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, error: toastError } = useToast();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.get(ENDPOINTS.USERS.ALL);
      setUsers(data.users || data.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to fetch users list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangeRole = async (userId, currentRole) => {
    const targetRole = currentRole === 'admin' ? 'customer' : 'admin';
    if (!window.confirm(`Switch role to ${targetRole}?`)) return;
    try {
      await axiosClient.patch(ENDPOINTS.AUTH.CHANGE_ROLE, {
        userId,
        role: targetRole,
      });
      success(`Role updated to ${targetRole}`);
      loadUsers();
    } catch (err) {
      toastError(err.message || 'Failed to change role');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Users & Roles
          </h2>
          <p className="text-xs text-slate-500">
            View registered customers and manage administrator privileges
          </p>
        </div>

        <Button variant="outline" size="sm" icon={RefreshCw} onClick={loadUsers}>
          Refresh
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Verified</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-100">{u.username || 'User'}</p>
                      <p className="text-xs text-slate-400 font-mono">{u.email}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                        u.role === 'admin'
                          ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      }`}>
                        {u.role === 'admin' && <Shield className="w-3 h-3" />}
                        {u.role || 'customer'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium">
                      {u.isVerified ? (
                        <span className="text-emerald-500 flex items-center gap-1">
                          <UserCheck className="w-4 h-4" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleChangeRole(u._id, u.role)}
                      >
                        Toggle Role
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
