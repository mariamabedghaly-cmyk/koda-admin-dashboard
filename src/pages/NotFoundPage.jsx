import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h1 className="text-7xl font-black text-primary-600">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-sm">
        The page you are looking for might have been moved or is currently being built by one of our team members.
      </p>
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
