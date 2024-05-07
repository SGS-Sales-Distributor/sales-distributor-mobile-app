<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header -->
      <header class="bg-transparent p-4 rounded-b-3xl">
        <div class="flex justify-between">
          <div>
            <button 
            type="button" 
            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="goBack">
              <ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
            </button>
          </div>
          <div class="flex items-center justify-center">
            <h2 class="font-bold">Profile</h2>
          </div>
          <div class="text-md">
            <button type="button" class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
              <icon-button>
                <ion-icon class="text-2xl" :icon="ellipsisVerticalOutline" color="dark"></ion-icon>
              </icon-button>
            </button>
          </div>          
        </div>
      </header>
      <!-- End of header -->

      <!-- Content -->
      <section>
        <div class="flex justify-center align-middle">
          <div class="text-center text-gray-500 max-w-full">
            <img class="w-32 h-32 rounded-full mx-auto" alt="user-photo" src="/public/uknown-profile.jpg">

            <!-- Card here -->
            <div class="rounded-xl overflow-hidden shadow-lg shadow-gray-300 w-96 mb-5">
              <div class="p-6 mx-6">
                <UpdateFormProfile />
              </div>
            </div>
            <!-- End Card Here -->

            <div class="rounded overflow-hidden shadow-lg shadow-gray-300 w-96 mb-5">
              <div class="p-6">
                <UpdateFormPassword />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End of Content -->
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  chevronBackOutline, 
  ellipsisVerticalOutline
} from 'ionicons/icons'
import { onMounted} from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import UpdateFormProfile from '@/components/UpdateFormProfile.vue';
import UpdateFormPassword from '@/components/UpdateFormPassword.vue';
import router from '@/router';

function goBack() {
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 100);
}

onMounted(() => {
  refreshAccessTokenHandler();
})
</script>
