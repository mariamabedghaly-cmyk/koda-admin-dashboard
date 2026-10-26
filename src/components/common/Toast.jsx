import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const styles = {
  success: 'border-emerald-500/30 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100',
  error: 'border-rose-500/30 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100',
  info: 'border-blue-500/30 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100',
};

export default function Toast({ id, message, type = 'info', onClose }) {
  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-in slide-in-from-bottom-5 ${
        styles[type] || styles.info
      }`}
    >
      <div className="flex items-center gap-3">
        {icons[type] || icons.info}
        <p className="text-sm font-medium leading-snug">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
