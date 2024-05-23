<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-gray-100">
      <!-- Header -->
      <HeaderSection />
      <!-- End of header -->

      <!-- Content -->
      <section class="container mx-auto">
        <div class="flex items-center justify-center min-h-screen">
          <div class="p-8 rounded-lg max-w-sm w-full relative">
            <img class="relative w-32 h-32 rounded-full mx-auto" alt="user-photo" :src="photoPath">
            <span class="absolute top-14 left-36 w-4 h-4 bg-green-400 rounded-full"></span>
            <span class="absolute top-14 left-36 w-4 h-4 bg-green-400 rounded-full animate-ping"></span>
            <span class="absolute top-14 left-36 w-4 h-4 bg-green-400 rounded-full animate-pulse"></span>

            <!-- Card here -->
            <div class="rounded overflow-hidden shadow-none bg-white dark:bg-gray-800">
              <div class="m-4">
                <UpdateFormProfile />
              </div>
            </div>
            <!-- End Card Here -->

            <hr/>
            
            <div class="rounded overflow-hidden shadow-none bg-white dark:bg-gray-800">
              <div class="m-4">
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
import HeaderSection from '../components/HeaderSection.vue'
import { onMounted, ref} from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import UpdateFormProfile from '@/components/profile/UpdateFormProfile.vue';
import UpdateFormPassword from '@/components/profile/UpdateFormPassword.vue';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const photoPath = ref("public/uknown-profile.jpg");

onMounted(() => {
  presentLoading();
  refreshAccessTokenHandler();
  stopLoading();
});
</script>
