<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <!-- Header -->
      <header class="bg-blue-500 p-6 rounded-b-3xl">
        <div class="flex justify-between">
          <div>
            <a href="/home" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/public/1630597076257.jpeg" class="h-12 rounded-full" alt="Sinergi Global Service" />
              <span class="self-center text-md font-semibold whitespace-nowrap dark:text-white">PT. Sinergi Global Service</span>
            </a>
          </div>          
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
      <!-- End of header -->
      
      <div class="flex min-h-full flex-col justify-start px-4 py-8">
        <!-- Main feature -->
        <div class="grid grid-cols-4 gap-6 text-center">
          <div>
            <div class="flex flex-col items-center justify-center space-y-2">
              <ion-button id="absensi-button" href="/absensi">
                <ion-icon class="text-2xl" :icon="cameraOutline"></ion-icon>
              </ion-button>
              <ion-label class="text-sm font-semibold">Absensi Visit</ion-label>
            </div>
          </div>
          <div>
            <div class="flex flex-col items-center justify-center space-y-2">
              <ion-button id="registrasi-toko-button" color="success">
                <ion-icon class="text-2xl" :icon="storefrontOutline"></ion-icon>
              </ion-button>
              <ion-label class="text-sm font-semibold">Registrasi Toko</ion-label>
            </div>
          </div>
          <div>
            <div class="flex flex-col items-center justify-center space-y-2">
              <ion-button id="katalog-produk-button" color="secondary">
                <ion-icon class="text-2xl" :icon="cubeOutline"></ion-icon>
              </ion-button>
              <ion-label class="text-sm font-semibold">Katalog Produk</ion-label>
            </div>
          </div>
          <div>
            <div class="flex flex-col items-center justify-center space-y-2">
              <ion-button id="purchase-order-button" color="tertiary">
                <ion-icon class="text-2xl" :icon="basketOutline"></ion-icon>
              </ion-button>
              <ion-label class="text-sm font-semibold">Purchase Order</ion-label>
            </div>
          </div>
          <div>
            <div class="flex flex-col items-center justify-center space-y-2">
              <ion-button color="warning" id="achievement-button">
                <ion-icon class="text-2xl" :icon="trophyOutline"></ion-icon>
              </ion-button>
              <ion-label class="text-sm font-semibold">Achievement</ion-label>
            </div>
          </div>
        </div>
        <!-- End main feature -->

        <!-- Swipe to right and left -->
        <div class="py-6">
          <h1 class="lg:px-20 md:px-10 lg:mx-40 md:mx-20 font-bold text-3xl text-gray-800">Promo Terkini</h1>
          <div class="flex overflow-x-scroll pb-4 hide-scroll-bar">
            <div class="flex flex-nowrap lg:ml-40 md:ml-20 space-x-4">
              <!-- Repeat this div for each item in your list -->
              <div class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/8d2ia-banner website 1587x621.jpg" alt="promo-pertama" class="w-full h-full object-cover">
              </div>
              <div class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/08e2b-banner-website-SA.png" alt="promo-pertama" class="w-full h-full object-cover">
              </div>
              <div class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/33jh8-blemish 1587x621.jpg" alt="promo-pertama" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div>
        <!-- End of swipe -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  cameraOutline, 
  storefrontOutline, 
  basketOutline,
  trophyOutline,
  notificationsOutline,
  cubeOutline,
} from 'ionicons/icons';
import { refreshAccessTokenHandler } from '@/services/auth.js';
import { onMounted } from 'vue';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`;

async function refreshToken() {
  refreshAccessTokenHandler();
}

async function fetchAuthUser() {
  try {
    refreshToken();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    if (!tokens) {
      console.error('Access Token and Refresh Token not found.');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
    };

    const response = await axios.get(`${API_URL}/api/v2/auth/me`, { headers: headers })

    const authUserData = response.data.resource.data;

    localStorage.setItem("user", JSON.stringify(authUserData));
  } catch (error) {
      console.error(`Failed to fetch auth user: ${error.message}`);
      throw new Error(`Failed to fetch auth user: ${error.message}`)
  }
}

onMounted(() => {
  refreshAccessTokenHandler();
  fetchAuthUser();
});

</script>

<style scoped>
  .hide-scroll-bar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .hide-scroll-bar::-webkit-scrollbar {
    display: none;
  }
</style>
