import React from 'react';

const SIZES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-3',
};

export default function LoadingSpinner({ size = 'md', className = '', color = '' }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-t-transparent ${
        color ? '' : 'border-primary-600 dark:border-primary-400'
      } ${SIZES[size] || SIZES.md} ${className}`}
      style={color ? { borderColor: color, borderTopColor: 'transparent' } : {}}
      role="status"
      aria-label="Loading"
    />
  );
}
