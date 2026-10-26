import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  isAddingToCart = false,
}) {
  if (!product) return null;

  const {
    _id,
    name,
    price,
    discountPrice,
    images = [],
    category,
    averageRating = 0,
    numReviews = 0,
    stock = 0,
  } = product;

  const imageUrl = images[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60';
  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;
  const finalPrice = hasDiscount ? discountPrice : price;

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Top badges & Wishlist button */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Link to={`/products/${_id}`} className="block w-full h-full">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {hasDiscount && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {stock <= 0 && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800/80 text-white backdrop-blur-sm">
              Out of stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={() => onToggleWishlist(product)}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {category && (
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">
            {category}
          </span>
        )}

        <Link
          to={`/products/${_id}`}
          className="font-semibold text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1 text-sm sm:text-base mb-1.5"
          title={name}
        >
          {name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {Number(averageRating).toFixed(1)}
          </span>
          <span>({numReviews})</span>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ${Number(finalPrice).toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                ${Number(price).toFixed(2)}
              </span>
            )}
          </div>

          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              disabled={stock <= 0 || isAddingToCart}
              className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
