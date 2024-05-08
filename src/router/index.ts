import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import AbsensiVisitPage from "@/views/AbsensiVisitPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import StoreDetailPage from "@/views/StoreDetailPage.vue";
import OrderBarangPage from "@/views/OrderBarangPage.vue";
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
        path: "/store/:id",
        name: "storeDetail",
        component: StoreDetailPage,
      },
      {
        path: "/store/:id/order",
        name: "orderBarang",
        component: OrderBarangPage,
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
