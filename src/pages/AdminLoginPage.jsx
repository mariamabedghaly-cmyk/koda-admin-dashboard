import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@koda.com');
  const [password, setPassword] = useState('admin1212');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      const userRole = res.user?.role || res.data?.user?.role || 'admin';
      if (userRole !== 'admin') {
        toastError('Account is not authorized as Admin');
        return;
      }
      success('Welcome back, Admin!');
      navigate('/');
    } catch (err) {
      toastError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Admin Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to manage Koda Store operations
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full py-3"
            size="lg"
            loading={loading}
          >
            Sign In to Dashboard
          </Button>
        </form>

        {/* Demo credentials helper */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <KeyRound className="w-3.5 h-3.5 text-amber-500" />
            <span>Test Admin Credentials:</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            Email: <span className="text-primary-600 font-semibold">admin@koda.com</span>
          </p>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            Password: <span className="text-primary-600 font-semibold">admin1212</span>
          </p>
        </div>
      </div>
    </div>
  );
}
