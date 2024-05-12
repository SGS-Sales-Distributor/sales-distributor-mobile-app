<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-gray-100">
      <!-- Header -->
      <HeaderSection />
      <!-- End of header -->

      <!-- Content -->
      <section class="py-6">
        <div class="flex justify-center items-center">
          <div class="text-center text-gray-500 max-w-full">
            <img class="w-32 h-32 rounded-full mx-auto" alt="user-photo" src="/public/uknown-profile.jpg">

            <!-- Card here -->
            <div class="rounded overflow-hidden shadow-none bg-white dark:bg-gray-800 w-96">
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
import { onMounted} from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import UpdateFormProfile from '@/components/profile/UpdateFormProfile.vue';
import UpdateFormPassword from '@/components/profile/UpdateFormPassword.vue';

onMounted(() => {
  refreshAccessTokenHandler();
})
</script>
