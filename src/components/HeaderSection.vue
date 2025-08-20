<template>
  <div class="header-section">
    <header class="bg-blue-500 p-6 rounded-b-3xl">
      <div class="flex justify-between">
        <router-link :to="{ name: 'home' }" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/public/1630597076257.jpeg" class="h-12 rounded-full" alt="Sinergi Global Service" width="50px"
            height="40px" />
          <span class="self-center text-sm font-semibold whitespace-nowrap text-gray-50">PT. Sinergi Global
            Servis</span>
        </router-link>
        <div class="">
          <ion-button>
            <ion-icon class="text-2xl" :icon="notificationsOutline"></ion-icon>
          </ion-button>
          <span class="sr-only">Notifications</span>
        
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { notificationsOutline } from 'ionicons/icons';
</script>

<style scoped>
.header-section {
  position: fixed;
  top : 0;
  width: 100%;
  z-index: 1000;
}
</style>