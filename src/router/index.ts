import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import AbsensiVisitPage from '@/views/AbsensiVisitPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: 'Login',
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: 'Login',
    },
  },
  // {
  //   path: '/register',
  //   component: () => import('@/views/RegistrasiPage.vue'),
  //   meta: {
  //     title: 'Registrasi',
  //   },
  // },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'home',
        component: HomePage,
      },
      {
        path: 'absensi',
        name: 'absensi',
        component: AbsensiVisitPage,
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
