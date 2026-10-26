# 🛡️ Koda Admin Dashboard - لوحة تحكم الإدارة

مستودع لوحة تحكم متجر **Koda Store**.
هذا المستودع مخصص لأعضاء فريق لوحة الإدارة (الأعضاء من 10 إلى 13) بقيادة العضو 1 (التيم ليد).

المشروع مبني بـ **React 18 + Vite + Tailwind CSS**.

---

## 🔗 رابط السيرفر وبيانات الدخول
* **Base URL:** `https://e-commerce-api-3wara.vercel.app`
* **توثيق Swagger الكامل لجميع الـ Endpoints:** [https://e-commerce-api-3wara.vercel.app/api-docs](https://e-commerce-api-3wara.vercel.app/api-docs)
* **حساب الأدمن التجريبي:**
  * **Email:** `admin@koda.com`
  * **Password:** `admin1212`

---

## 📚 دليل الربط اليدوي بالـ API لأعضاء لوحة الإدارة (Manual API Integration)

جميع مسارات لوحة التحكم تتطلب مصادقة الأدمن (`role === 'admin'`)، لذا يجب على كل متدرب تمرير الـ **Token** يدوياً في ترويسات الطلب (`Headers`):

### 1. جلب بيانات لوحة التحكم مع الـ Token:
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // 1. جلب التوكن من الـ localStorage
      const token = localStorage.getItem('token');

      try {
        // 2. إرسال الطلب مع الترويسة يدوياً
        const res = await axios.get('https://e-commerce-api-3wara.vercel.app/orders/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return <div>{/* جدول عرض الطلبات */}</div>;
}
```

---

### 2. تعديل حالة طلب أو منتج (PATCH / PUT):
```jsx
// مثال لتحديث حالة الطلب وإرسال ملاحظة الأدمن
const updateOrderStatus = async (orderId, newStatus, note) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.patch(
      `https://e-commerce-api-3wara.vercel.app/orders/admin/${orderId}/status`,
      {
        status: newStatus,
        adminNote: note,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('تم تحديث حالة الطلب بنجاح!');
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء التحديث');
  }
};
```

---

### 3. إضافة أو حذف منتج (POST / DELETE):
```jsx
// حذف منتج
const deleteProduct = async (productId) => {
  const token = localStorage.getItem('token');
  if (!window.confirm('هل أنت متأكد من حذف المنتج؟')) return;

  try {
    await axios.delete(`https://e-commerce-api-3wara.vercel.app/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('تم حذف المنتج بنجاح');
  } catch (err) {
    alert(err.response?.data?.message || 'فشل حذف المنتج');
  }
};
```

---

## 👥 مهام أعضاء فريق لوحة الإدارة:

| العضو | الميزة / الصفحة | الملفات المسؤولة | الـ Endpoints المربوطة يدوياً |
| :--- | :--- | :--- | :--- |
| **عضو 10** | دخول الأدمن ولوحة الإحصائيات | `pages/AdminLoginPage.jsx`, `pages/DashboardOverview.jsx` | `POST /auth/login`<br>`GET /orders/admin/dashboard`<br>`GET /wishlists/admin/stats` |
| **عضو 11** | إدارة المنتجات والمخزون | `pages/AdminProductsPage.jsx` | `GET /products`<br>`POST /products`<br>`PUT /products/update/{id}`<br>`DELETE /products/{id}` |
| **عضو 12** | إدارة وتحديث الطلبات | `pages/AdminOrdersPage.jsx` | `GET /orders/admin`<br>`GET /orders/admin/{id}`<br>`PATCH /orders/admin/{id}/status` |
| **عضو 13** | المستخدمين والسلات النشطة | `pages/AdminUsersPage.jsx`, `pages/AdminCartsPage.jsx` | `GET /users/all`<br>`POST /users/add`<br>`PATCH /auth/change-role`<br>`GET /orders/admin/carts` |

---

## 🚀 تشغيل لوحة التحكم محلياً

```bash
npm install
npm run dev
```

## 🌿 نظام الفروع (Git Workflow)
```bash
git checkout develop
git checkout -b feature/order-management-name
# اكتب كودك ثم:
git add .
git commit -m "feat: manual patch call for order status"
git push origin feature/order-management-name
# ثم افتح Pull Request لفرع develop على GitHub
```
