# 🛡️ Koda Admin Dashboard - لوحة تحكم الإدارة

مستودع لوحة تحكم متجر **Koda Store**.
هذا المستودع مخصص لأعضاء فريق لوحة الإدارة (الأعضاء من 10 إلى 13) بقيادة العضو 1 (التيم ليد).

---

## 👥 توزيع المهام داخل هذا الريبو (Admin Team Tasks)

| العضو | الميزة / الصفحة | الملفات المسؤولة | الـ Endpoints المربوطة |
| :--- | :--- | :--- | :--- |
| **عضو 10** | دخول الأدمن ولوحة الإحصائيات | `pages/AdminLoginPage.jsx`, `pages/DashboardOverview.jsx` | `POST /auth/login`<br>`GET /orders/admin/dashboard`<br>`GET /wishlists/admin/stats` |
| **عضو 11** | إدارة المنتجات والمخزون | `pages/AdminProductsPage.jsx`, `components/admin/ProductFormModal.jsx` | `GET /products`<br>`POST /products`<br>`PUT /products/update/{id}`<br>`DELETE /products/{id}` |
| **عضو 12** | إدارة وتحديث الطلبات | `pages/AdminOrdersPage.jsx`, `components/admin/StatusUpdateModal.jsx` | `GET /orders/admin`<br>`GET /orders/admin/{id}`<br>`PATCH /orders/admin/{id}/status` |
| **عضو 13** | المستخدمين والسلات النشطة | `pages/AdminUsersPage.jsx`, `pages/AdminCartsPage.jsx` | `GET /users/all`<br>`POST /users/add`<br>`PATCH /auth/change-role`<br>`GET /orders/admin/carts` |

---

## 🔑 حساب الدخول التجريبي للأدمن
* **Email:** `admin@koda.com`
* **Password:** `admin1212`

---

## 🚀 تشغيل لوحة التحكم محلياً

```bash
npm install
npm run dev
```
تعمل على المنفذ: `http://localhost:3000`

## 🌿 نظام الفروع (Git Workflow)
* فرع العمل الأساسي هو `develop`.
* أنشئ فرعك الخاص قبل البدء:
  ```bash
  git checkout develop
  git checkout -b feature/order-management-name
  ```
* افتح Pull Request لـ `develop` عند إتمام الميزة لمراجعتها من الليدر.
