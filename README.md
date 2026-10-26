# 🛡️ Koda Admin Dashboard - Control Center

Welcome to the **Koda Store Admin Dashboard** repository! This workspace is dedicated to the **Admin Dashboard Team (Members 10 through 13)**, led by Member 1 (Team Leader).

The project is built with **React 18**, **Vite**, **Tailwind CSS**, and **React Router DOM v6**.

---

## 🔗 Live API & Admin Credentials

* **Base API URL:** `https://e-commerce-api-3wara.vercel.app`
* **Interactive Swagger API Docs:** [https://e-commerce-api-3wara.vercel.app/api-docs](https://e-commerce-api-3wara.vercel.app/api-docs)
* **Test Administrator Credentials:**
  * **Email:** `admin@koda.com`
  * **Password:** `admin1212`

---

## 🚀 Getting Started

Follow these steps to set up your local development environment:

```bash
# 1. Clone the repository
git clone https://github.com/mariamabedghaly-cmyk/koda-admin-dashboard.git
cd koda-admin-dashboard

# 2. Switch to the develop branch
git checkout develop

# 3. Install dependencies
npm install

# 4. Create your feature branch (replace with your task and name)
git checkout -b feature/order-management-sara

# 5. Start the local development server
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 📚 Manual API Integration Guide for Admin Team

All admin endpoints require an active administrator JWT token (`role === 'admin'`). Team members must manually pass the authorization token in request headers.

### 1. Fetching Admin Data with Token (GET Request Example):
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // Retrieve stored admin token
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          'https://e-commerce-api-3wara.vercel.app/orders/admin',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Manual Authorization Header
            },
          }
        );
        setOrders(response.data.orders);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return <div>{/* Render Orders Table */}</div>;
}
```

---

### 2. Updating Order Status (PATCH Request Example):
```jsx
const updateOrderStatus = async (orderId, newStatus, adminNote) => {
  const token = localStorage.getItem('token');

  try {
    await axios.patch(
      `https://e-commerce-api-3wara.vercel.app/orders/admin/${orderId}/status`,
      {
        status: newStatus,
        adminNote: adminNote,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('Order status updated successfully!');
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to update order status');
  }
};
```

---

### 3. Deleting or Modifying a Product (DELETE Request Example):
```jsx
const deleteProduct = async (productId) => {
  const token = localStorage.getItem('token');
  if (!window.confirm('Are you sure you want to delete this product?')) return;

  try {
    await axios.delete(`https://e-commerce-api-3wara.vercel.app/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Product deleted successfully');
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to delete product');
  }
};
```

---

## 👥 Admin Team Task Distribution & API Endpoints

| Member | Feature / Page | Target Files | Assigned Manual Endpoints |
| :--- | :--- | :--- | :--- |
| **Member 10** | Admin Authentication & Dashboard Analytics | `pages/AdminLoginPage.jsx`, `pages/DashboardOverview.jsx` | `POST /auth/login`<br>`GET /orders/admin/dashboard`<br>`GET /wishlists/admin/stats` |
| **Member 11** | Products Inventory Management | `pages/AdminProductsPage.jsx`, `components/admin/ProductModal.jsx` | `GET /products`<br>`POST /products`<br>`PUT /products/update/{id}`<br>`DELETE /products/{id}` |
| **Member 12** | Orders Management & Status Updates | `pages/AdminOrdersPage.jsx`, `components/admin/StatusModal.jsx` | `GET /orders/admin`<br>`GET /orders/admin/{id}`<br>`PATCH /orders/admin/{id}/status` |
| **Member 13** | User Roles & Active Carts Monitoring | `pages/AdminUsersPage.jsx`, `pages/AdminCartsPage.jsx` | `GET /users/all`<br>`POST /users/add`<br>`PATCH /auth/change-role`<br>`GET /orders/admin/carts` |

---

## 📂 Project Structure

```
koda-admin-dashboard/
├── index.html
├── package.json
├── tailwind.config.js
├── src/
│   ├── components/
│   │   ├── admin/          # Admin-specific components (StatCard, StatusBadge)
│   │   ├── common/         # Reusable UI (Button, Input, Modal, Skeleton, Toast)
│   │   └── layout/         # AdminSidebar, AdminHeader, AdminLayout
│   ├── context/
│   │   ├── AuthContext.jsx # Role verification (role === 'admin')
│   │   ├── ThemeContext.jsx# Dark / Light mode toggle
│   │   └── ToastContext.jsx# Pop-up notifications
│   ├── pages/              # Admin pages (Dashboard, Products, Orders, Users, Carts)
│   ├── routes/             # AppRoutes, AdminRoute
│   ├── App.jsx
│   └── main.jsx
```

---

## 🌿 Git Branching & Contribution Workflow

1. Always branch off the `develop` branch:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```
2. Commit your progress with descriptive conventional commit messages:
   ```bash
   git add .
   git commit -m "feat: implement order status update modal"
   ```
3. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a **Pull Request (PR)** targeting the `develop` branch on GitHub for code review.
