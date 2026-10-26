import React from 'react';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    styles: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  confirmed: {
    label: 'Confirmed',
    styles: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  processing: {
    label: 'Processing',
    styles: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  },
  shipped: {
    label: 'Shipped',
    styles: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  },
  delivered: {
    label: 'Delivered',
    styles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  cancelled: {
    label: 'Cancelled',
    styles: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  },
  returned: {
    label: 'Returned',
    styles: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  },
};

export default function StatusBadge({ status }) {
  const normalized = status ? status.toLowerCase() : 'pending';
  const config = STATUS_CONFIG[normalized] || STATUS_CONFIG.pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.styles}`}
    >
      {config.label}
    </span>
  );
}
