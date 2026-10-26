import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2, Edit, Package } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import ENDPOINTS from '../api/endpoints';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import { useToast } from '../context/ToastContext';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { success, error: toastError } = useToast();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.get(ENDPOINTS.PRODUCTS.LIST);
      setProducts(data.products || data.data || []);
    } catch (err) {
      toastError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (productId, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await axiosClient.delete(ENDPOINTS.PRODUCTS.BY_ID(productId));
      success(`Product "${name}" deleted`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      toastError(err.message || 'Failed to delete product');
    }
  };

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Products Catalog
          </h2>
          <p className="text-xs text-slate-500">
            Manage inventory, pricing, and product status
          </p>
        </div>

        <Button icon={Plus} size="sm">
          Add New Product
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                        {item.images?.[0]?.url ? (
                          <img src={item.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-slate-400 m-auto mt-2.5" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">SKU: {item.sku || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs capitalize text-slate-600 dark:text-slate-300">
                      {item.category || 'General'}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        item.stock > 10
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-rose-500/10 text-rose-600'
                      }`}>
                        {item.stock} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
