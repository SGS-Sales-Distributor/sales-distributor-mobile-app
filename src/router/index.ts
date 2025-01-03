import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import AbsensiVisitPage from "@/views/AbsensiVisitPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import StoreDetailPage from "@/views/StoreDetailPage.vue";
import StoreDetailPageFromPO from "@/views/StoreDetailPageFromPO.vue";
import OrderBarangPage from "@/views/OrderBarangPage.vue";
import RegistrasiTokoBaruPage from './../views/RegistrasiTokoBaruPage.vue'
import RegistrasiOwnerBaruPage from './../views/RegistrasiOwnerBaruPage.vue'
import PurchaseOrderPage from './../views/PurchaseOrderPage.vue'
import { isAuthenticated } from "@/services/auth";
import "maplibre-gl/dist/maplibre-gl.css";
import RegistrasiPage from "@/views/RegistrasiPage.vue";
import historyVisit from "./../views/HistoryVisitPage.vue";
import Plans from "./../views/Plans.vue";
import DaftarPlanVisit from "./../views/DaftarPlanVisit.vue";
import DaftarToko from "@/views/DaftarToko.vue";
import DaftarPo from "@/views/DaftarPo.vue";
import DetailOrder from "@/views/DetailOrder.vue";
import DetailBeforeOrder from "@/views/DetailBeforeOrder.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
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
    path: "/registerAkun",
    name: "registerAkun",
    component: RegistrasiPage
  },
  // {
  //   path: "registerAkun",
  //   name: "registerAkun",
  //   component: RegistrasiPage,
  // },
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
        path: "/order",
        name: "purchaseOrder",
        component: PurchaseOrderPage,
      },
      {
        path: "/store/:id",
        name: "storeDetail",
        component: StoreDetailPage,
      },
      {
        path: "/store/:id/order",
        name: "storePurchaseOrder",
        component: OrderBarangPage,
      },
      {
        path: "/store/register",
        name: "registerNewStore",
        component: RegistrasiTokoBaruPage,
      },
      {
        path: "/store/register/owner/:id",
        name: "registerOwnerStore",
        component: RegistrasiOwnerBaruPage,
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
      {
        path: "/storeInfo/:id",
        name: "storeDetailFromPO",
        component: StoreDetailPageFromPO,
      },
      {
        path: "historyVisit/:id",
        name: "historyVisit",
        component: historyVisit,
      },
      {
        path: "Plans",
        name: "Plans",
        component: Plans,
      },
      {
        path: "DaftarPlanVisit",
        name: "DaftarPlanVisit",
        component: DaftarPlanVisit,
      },
      {
        path :"DaftarToko",
        name :"DaftarToko",
        component: DaftarToko,
      },

      {
        path :"DaftarPo",
        name :"DaftarPo",
        component: DaftarPo,
      },

      {
        path :"DetailOrder",
        name :"DetailOrder",
        component: DetailOrder,
      },

      {
        path :"DetailBeforeOrder",
        name :"DetailBeforeOrder",
        component: DetailBeforeOrder,
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
