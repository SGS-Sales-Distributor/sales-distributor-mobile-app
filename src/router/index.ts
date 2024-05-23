import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import AbsensiVisitPage from "@/views/AbsensiVisitPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import StoreDetailPage from "@/views/StoreDetailPage.vue";
import StoreDetailOrderPage from "@/views/StoreDetailOrderPage.vue";
import RegistrasiTokoBaruPage from './../views/RegistrasiTokoBaruPage.vue'
import RegistrasiOwnerBaruPage from './../views/RegistrasiOwnerBaruPage.vue'
import PurchaseOrderHistoryPage from "@/views/PurchaseOrderHistoryPage.vue";
import PurchaseOrderPage from './../views/PurchaseOrderPage.vue'
import PurchaseOrderStoreDetailPage from './../views/PurchaseOrderStoreDetailPage.vue'
import PurchaseOrderStoreDetailOrderPage from './../views/PurchaseOrderStoreDetailOrderPage.vue'
import ProductPage from './../views/ProductPage.vue'

import { isAuthenticated } from "@/services/auth";
import "maplibre-gl/dist/maplibre-gl.css";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      title: "Login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/",
    component: TabsPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        name: "home",
        component: HomePage,
      },
      {
        path: "/direct-order",
        name: "directPurchaseOrder",
        component: PurchaseOrderPage,
      },
      {
        path: "/direct-order/store/:id",
        name: "directPurchaseOrderStoreDetail",
        component: PurchaseOrderStoreDetailPage,
      },
      {
        path: "/direct-order/store/:id/order",
        name: "directPurchaseOrderStoreDetailOrder",
        component: PurchaseOrderStoreDetailOrderPage,
      },
      {
        path: "/order-history",
        name: "purchaseOrderHistory",
        component: PurchaseOrderHistoryPage,
      },
      { 
        path: "/store/:id",
        name: "storeDetail",
        component: StoreDetailPage,
      },
      {
        path: "/store/:id/order",
        name: "storePurchaseOrder",
        component: StoreDetailOrderPage,
      },
      {
        path: "/store/register",
        name: "registerNewStore",
        component: RegistrasiTokoBaruPage,
      },
      {
        path: "/store/register/owner",
        name: "registerOwnerStore",
        component: RegistrasiOwnerBaruPage,
      },
      {
        path: "product",
        name: "product",
        component: ProductPage,
      },
      {
        path: "absensi",
        name: "absensi",
        component: AbsensiVisitPage,
      },
      {
        path: "profile",
        name: "profile",
        component: ProfilePage
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
