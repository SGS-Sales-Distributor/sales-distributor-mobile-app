<template>
  <header class="bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 p-6 rounded-b-3xl">
    <div class="flex justify-between">
      <router-link :to="{ name: 'home' }" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/public/1630597076257.jpeg" class="h-12 rounded-full" alt="Sinergi Global Service" />
        <span class="self-center text-sm font-semibold whitespace-nowrap text-gray-50">PT. Sinergi Global Service</span>
      </router-link>
      <div class="relative inline-flex items-center p-2">
        <ion-button>
          <ion-icon class="text-2xl" :icon="notificationsOutline"></ion-icon>
        </ion-button>
        <span class="sr-only">Notifications</span>
        <div
          class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-0 border-white rounded-full -top-2 -end-2">
          20</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { notificationsOutline } from 'ionicons/icons';
</script>