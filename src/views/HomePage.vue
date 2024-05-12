<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header -->
      <HeaderSection />      
      <!-- End of header -->
      
      <div class="flex min-h-full flex-col justify-start px-4 py-8">
        <!-- Feature Section -->
        <FeatureSection />
        <!-- End of Feature Section -->

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
import FeatureSection from './../components/home/FeatureSection.vue'
import HeaderSection from '../components/HeaderSection.vue'
import { refreshAccessTokenHandler } from '@/services/auth.js';
import { onMounted } from 'vue';
import { catchToastError } from '@/services/toastHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';

async function fetchAuthUser() {
  refreshAccessTokenHandler();
  
  const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

  if (!tokens) {
    console.error('Access Token and Refresh Token not found.');
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.access_token}`
  };
    
  try {
    const response = await axios.get(`${API_URL.value}/api/v2/auth/me`, { headers: headers })

    const authUserData = response.data.resource.data;

    localStorage.setItem("user", JSON.stringify(authUserData));

    console.log(JSON.parse(localStorage.getItem("user")));
  } catch (error) {
      catchToastError(error.message);
      
      console.error(`Failed to fetch auth user: ${error.message}`);
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
