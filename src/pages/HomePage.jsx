import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import ENDPOINTS from '../api/endpoints';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import Modal from '../components/common/Modal';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const { success, error: toastError, info } = useToast();
  const { isAuthenticated, user } = useAuth();

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Calls live API: https://e-commerce-api-3wara.vercel.app/products
      const data = await axiosClient.get(ENDPOINTS.PRODUCTS.LIST, {
        params: { limit: 8 },
      });
      const list = data.products || data.data || [];
      setProducts(list);
    } catch (err) {
      setError(err.message);
      toastError(`Failed to load products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    info(`Added "${product.name}" to cart (Demo state)`);
  };

  const handleToggleWishlist = (product) => {
    success(`Toggled wishlist for "${product.name}"`);
  };

  return (
    <div className="space-y-12">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Koda Store Core Architecture Ready</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Next-Gen E-Commerce Frontend Platform
          </h1>

          <p className="text-sm sm:text-base text-primary-100 leading-relaxed">
            Welcome to the frontend workspace! This foundation includes pre-configured Axios client, JWT authentication context, dark mode, toast notifications, and shared UI components ready for team development.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Test Modal & Components
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={fetchFeaturedProducts}
              icon={RefreshCw}
              loading={loading}
            >
              Refresh Live API Data
            </Button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </section>

      {/* Auth Status Banner */}
      <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Auth State: {isAuthenticated ? `Logged In as (${user?.email || 'User'})` : 'Guest Mode (Not logged in)'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isAuthenticated
                ? `Role: ${user?.role || 'customer'} | User ID: ${user?._id || 'N/A'}`
                : 'Use test credentials from the README to sign in as admin or customer'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => success('Toast system is working perfectly!')}
          >
            Trigger Success Toast
          </Button>
        </div>
      </section>

      {/* Featured Products Showcase (Live API) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Live Products from Backend API
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Fetched directly from <code className="text-primary-600 font-mono">/products</code> endpoint
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={ArrowRight}
            className="hidden sm:inline-flex"
            onClick={() => info('Catalog navigation')}
          >
            Explore Catalog
          </Button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
            Failed to fetch products: {error}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <Skeleton className="w-full aspect-square" />
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-full h-8" />
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="p-12 text-center text-sm text-slate-500">
            No products returned from the API yet.
          </div>
        )}
      </section>

      {/* Demo Modal for testing */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Reusable Modal Component"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsDemoModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                success('Action confirmed!');
                setIsDemoModalOpen(false);
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="leading-relaxed">
          This modal is ready for Member #12 (Order status changes), Member #5 (Reviews modal), or any member needing dialogs. It features backdrop blur, escape-key closing, focus locking, and full dark-mode compatibility!
        </p>
      </Modal>
    </div>
  );
}
