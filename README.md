# 🛡️ Koda Admin Dashboard - Control Center

Welcome to the **Koda Store Admin Dashboard** repository! This project represents the administrator control panel for managing products, orders, users, and store analytics.

* **Repository:** [https://github.com/mariamabedghaly-cmyk/koda-admin-dashboard](https://github.com/mariamabedghaly-cmyk/koda-admin-dashboard)
* **Team:** Member 1 (Team Leader) & Members 10 through 13
* **Tech Stack:** React 18, Vite, Tailwind CSS, React Router DOM v6, Axios

> ⚠️ **TRAINING WORKSPACE SPECIFICATION:**  
> This repository is a **clean starter boilerplate**. There are **no pre-built components or pages** in the codebase. Each team member is required to **create their assigned files from scratch**, build the UI with Tailwind CSS, and write the **manual API integration** directly using `axios` as specified below.

---

## 🔗 Live Backend API & Admin Credentials

* **Base URL:** `https://e-commerce-api-3wara.vercel.app`
* **Swagger API Documentation:** [https://e-commerce-api-3wara.vercel.app/api-docs](https://e-commerce-api-3wara.vercel.app/api-docs)
* **Test Administrator Account:**
  * **Email:** `admin@koda.com`
  * **Password:** `admin1212`

---

## 🚀 Quick Start Guide

```bash
# 1. Clone the repository
git clone https://github.com/mariamabedghaly-cmyk/koda-admin-dashboard.git
cd koda-admin-dashboard

# 2. Switch to develop branch
git checkout develop

# 3. Install packages
npm install

# 4. Create your task branch
git checkout -b feature/order-management-yourname

# 5. Start development server
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## 📚 Manual API Integration Rules for Admin Team

All admin endpoints require an active administrator JWT token (`role === 'admin'`). Team members must manually pass the authorization token in request headers.

1. **Admin Data Retrieval (GET with Token):**
   ```jsx
   const token = localStorage.getItem('token');
   const res = await axios.get('https://e-commerce-api-3wara.vercel.app/orders/admin', {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
   ```

2. **Admin Status Modification (PATCH with Token):**
   ```jsx
   const token = localStorage.getItem('token');
   const res = await axios.patch(
     `https://e-commerce-api-3wara.vercel.app/orders/admin/${orderId}/status`,
     { status: 'shipped', adminNote: 'Dispatched via FedEx' },
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
   );
   ```

3. **Admin Resource Deletion (DELETE with Token):**
   ```jsx
   const token = localStorage.getItem('token');
   await axios.delete(`https://e-commerce-api-3wara.vercel.app/products/${productId}`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
   ```

---

## 👥 Detailed Member-by-Member Task Assignment

### 👑 Member 1: Team Leader & Core Architecture
* **Target Files to Setup:**
  * `src/components/common/` (Buttons, Inputs, Modals, Spinners)
  * `src/components/admin/` (StatCard, StatusBadge)
  * `src/components/layout/` (AdminSidebar, AdminHeader, AdminLayout)
  * `src/context/` (AuthContext, ThemeContext, ToastContext)
  * `src/routes/` (AppRoutes, AdminRoute)
* **Responsibilities:**
  * Provide admin dashboard shell layout, sidebar navigation, dark/light theme toggle, and route protection.
  * Review all incoming Pull Requests (PRs) and merge them into `develop`.

---

### 📊 Member 10: Admin Authentication & Dashboard Analytics
* **Target Files to Create:**
  * `src/pages/AdminLoginPage.jsx`
  * `src/pages/DashboardOverview.jsx`
* **Task Description:**
  * Build the dedicated administrator login page with validation and verify that `user.role === 'admin'`.
  * Build the main dashboard overview page: KPI summary cards (Total Revenue, Total Orders, Total Products, Wishlist count).
  * Build real-time sales/orders charts and display recent orders summary table.
* **Manual Endpoints to Call:**
  * `POST https://e-commerce-api-3wara.vercel.app/auth/login`
  * `GET https://e-commerce-api-3wara.vercel.app/orders/admin/dashboard` *(Requires Token in Headers)*
  * `GET https://e-commerce-api-3wara.vercel.app/wishlists/admin/stats` *(Requires Token in Headers)*

---

### 📦 Member 11: Product Inventory & Management (CRUD)
* **Target Files to Create:**
  * `src/pages/AdminProductsPage.jsx`
  * `src/components/admin/ProductModal.jsx` (Add & Edit Modal Form)
* **Task Description:**
  * Build products table with live search, category filtering, stock level indicator, and pagination.
  * Build "Add New Product" modal form: title, description, category, price, discount price, stock quantity, and Cloudinary image upload.
  * Build "Edit Product" modal to update price and stock.
  * Build product deletion action with confirmation prompt.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/products`
  * `POST https://e-commerce-api-3wara.vercel.app/products` *(Requires Token in Headers)*
  * `PUT https://e-commerce-api-3wara.vercel.app/products/update/{id}` *(Requires Token in Headers)*
  * `DELETE https://e-commerce-api-3wara.vercel.app/products/{id}` *(Requires Token in Headers)*

---

### 🚚 Member 12: Order Management & Status Updates
* **Target Files to Create:**
  * `src/pages/AdminOrdersPage.jsx`
  * `src/components/admin/StatusUpdateModal.jsx`
* **Task Description:**
  * Build orders management table displaying order ID, customer email, total price, creation date, and status badge.
  * Build filter system by status (`pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`, `returned`).
  * Build "Update Order Status" modal allowing the admin to select a new status and write an administrative note for the customer (triggers status update email).
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/orders/admin` *(Requires Token in Headers)*
  * `GET https://e-commerce-api-3wara.vercel.app/orders/admin/{id}` *(Requires Token in Headers)*
  * `PATCH https://e-commerce-api-3wara.vercel.app/orders/admin/{id}/status` *(Requires Token in Headers)*

---

### 👥 Member 13: User Administration & Active Carts Monitoring
* **Target Files to Create:**
  * `src/pages/AdminUsersPage.jsx`
  * `src/pages/AdminCartsPage.jsx`
* **Task Description:**
  * Build registered users table showing username, email, verified status, and role badge (`admin` / `customer`).
  * Implement "Change Role" button to promote or demote user permissions.
  * Build manual "Add User" form.
  * Build active shopping carts monitoring page (`/carts`) to analyze open customer carts and identify abandoned checkout sessions.
* **Manual Endpoints to Call:**
  * `GET https://e-commerce-api-3wara.vercel.app/users/all` *(Requires Token in Headers)*
  * `POST https://e-commerce-api-3wara.vercel.app/users/add` *(Requires Token in Headers)*
  * `PATCH https://e-commerce-api-3wara.vercel.app/auth/change-role` *(Requires Token in Headers)*
  * `GET https://e-commerce-api-3wara.vercel.app/orders/admin/carts` *(Requires Token in Headers)*

---

## 🌿 Contribution Rules (Git Workflow)

1. Make sure your local `develop` branch is up to date:
   ```bash
   git checkout develop
   git pull origin develop
   ```
2. Create your isolated feature branch:
   ```bash
   git checkout -b feature/order-status-yourname
   ```
3. Commit your progress with descriptive messages:
   ```bash
   git add .
   git commit -m "feat: implement admin order status update modal"
   ```
4. Push your branch to GitHub:
   ```bash
   git push origin feature/order-status-yourname
   ```
5. Open a **Pull Request (PR)** on GitHub targeting `develop` for the Team Leader to review!
