import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-base">
                K
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Koda<span className="text-primary-600">Store</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Modern full-stack e-commerce experience powered by React, Tailwind CSS, and Node.js REST API.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/products" className="hover:text-primary-600">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="hover:text-primary-600">Electronics</Link></li>
              <li><Link to="/products?category=audio" className="hover:text-primary-600">Audio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Customer
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/orders" className="hover:text-primary-600">My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-600">Wishlist</Link></li>
              <li><Link to="/profile" className="hover:text-primary-600">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Project Info
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Frontend Internship Training Project
            </p>
            <span className="inline-block px-2.5 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-500/20">
              API Status: Online
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Koda Store. Built for Frontend Team Training.
        </div>
      </div>
    </footer>
  );
}
