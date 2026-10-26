import React from 'react';

export default function Skeleton({ className = '', variant = 'rect' }) {
  const base = 'animate-pulse bg-slate-200 dark:bg-slate-700/60';

  if (variant === 'circle') {
    return <div className={`${base} rounded-full ${className}`} />;
  }

  return <div className={`${base} rounded-xl ${className}`} />;
}
