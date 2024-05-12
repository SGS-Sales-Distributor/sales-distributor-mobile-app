<template>
    <header class="bg-blue-500 p-6 rounded-b-3xl">
        <div class="flex justify-between">
          <router-link :to="{ name: 'home' }" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/public/1630597076257.jpeg" class="h-12 rounded-full" alt="Sinergi Global Service" />
            <span class="text-white self-center text-md font-semibold whitespace-nowrap">PT. Sinergi Global Service</span>
          </router-link>          
          <div>
            <button type="button" class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <icon-button>
                <ion-icon class="text-2xl" :icon="notificationsOutline"></ion-icon>
              </icon-button>
              <span class="sr-only">Notifications</span>
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-0 border-white rounded-full -top-2 -end-2">20</div>
            </button>
          </div>
        </div>
    </header>
</template>

<script setup>
import { notificationsOutline } from 'ionicons/icons';
</script>