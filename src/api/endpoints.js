/**
 * Centralized API endpoints for Koda Store
 * Production Base URL: https://e-commerce-api-3wara.vercel.app
 */

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER_SEND_OTP: '/auth/register/send-otp',
    REGISTER_VERIFY_OTP: '/auth/register/verify-otp',
    FORGOT_PASSWORD_SEND_OTP: '/auth/forgot-password/send-otp',
    FORGOT_PASSWORD_VERIFY_OTP: '/auth/forgot-password/verify-otp',
    ME: '/auth/me',
    CHANGE_ROLE: '/auth/change-role',
    ADMIN_TEST: '/auth/admin-test',
  },

  // Users
  USERS: {
    ALL: '/users/all',
    ADD: '/users/add',
    BY_ID: (id) => `/users/${id}`,
  },

  // Products & Reviews
  PRODUCTS: {
    LIST: '/products',
    SEARCH: '/products/search',
    BY_ID: (id) => `/products/${id}`,
    UPDATE: (id) => `/products/update/${id}`,
    REVIEWS: (id) => `/products/${id}/reviews`,
    DELETE_REVIEW: (productId, reviewId) => `/products/${productId}/reviews/${reviewId}`,
  },

  // Cart
  CART: {
    GET: '/carts',
    ADD_ITEM: '/carts/items',
    UPDATE_ITEM: (productId) => `/carts/items/${productId}`,
    DELETE_ITEM: (productId) => `/carts/items/${productId}`,
    APPLY_COUPON: '/carts/coupon',
    CLEAR: '/carts/clear',
  },

  // Orders - Customer
  ORDERS: {
    CREATE: '/orders',
    MY_ORDERS: '/orders/my',
    MY_ORDER_DETAILS: (id) => `/orders/my/${id}`,
    CANCEL_ORDER: (id) => `/orders/my/${id}/cancel`,
  },

  // Orders - Admin
  ADMIN_ORDERS: {
    DASHBOARD: '/orders/admin/dashboard',
    CARTS: '/orders/admin/carts',
    ALL: '/orders/admin',
    BY_ID: (id) => `/orders/admin/${id}`,
    UPDATE_STATUS: (id) => `/orders/admin/${id}/status`,
  },

  // Wishlist
  WISHLIST: {
    MY: '/wishlists/my',
    ADD: (productId) => `/wishlists/add/${productId}`,
    REMOVE: (productId) => `/wishlists/remove/${productId}`,
    CLEAR: '/wishlists/clear',
    ADMIN_ALL: '/wishlists/admin/all',
    ADMIN_STATS: '/wishlists/admin/stats',
  },
};

export default ENDPOINTS;
