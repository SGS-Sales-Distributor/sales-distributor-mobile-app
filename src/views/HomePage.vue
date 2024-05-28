<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Header -->
      <HeaderSection />
      <!-- End of header -->

      <div class="flex min-h-full flex-col justify-start px-4 py-6 bg-white">
        <!-- Feature Section -->
        <FeatureSection />
        <!-- End of Feature Section -->

        <div class="pt-8 pb-4">
          <div class="mx-auto px-6 max-w-full text-gray-900">
            <div class="text-center">
              <h2 v-if="user" class="text-gray-900 text-base">
                Selamat datang kembali, <span class="font-semibold underline underline-offset-4">{{
                  user.fullname }}</span>
              </h2>
            </div>
            <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200">
                <div aria-hidden="true"
                  class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white blur-2xl opacity-25">
                </div>
                <div class="relative">
                  <div class="mt-2 pb-6 rounded-b-[--card-border-radius] space-y-2">
                    <h2 class="text-gray-900 text-2xl font-semibold">Call Plan Hari Ini</h2>
                    <p class="text-gray-700 text-lg">Anda memiliki <span class="font-semibold">{{ storesData.length
                        }}</span> call plan hari ini.</p>
                  </div>

                  <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200">
                    <router-link :to="{ name: 'absensi' }"
                      class="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 text-gray-950 bg-blue-300/50 hover:bg-blue-400/75 active:bg-gray-100 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center transition-all">
                      <span>Cek Detail</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                      </svg>
                    </router-link>
                    <span
                      class="group flex items-center rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 size-8 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-calendar3" viewBox="0 0 16 16">
                        <path
                          d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                        <path
                          d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200">
                <div aria-hidden="true"
                  class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-lime-500 to-white blur-2xl opacity-25">
                </div>
                <div class="relative">
                  <div class="mt-2 pb-6 rounded-b-[--card-border-radius] space-y-2">
                    <h2 class="text-gray-900 text-2xl font-semibold">Total Call Plan yang Tercapai</h2>
                    <p class="text-gray-700 text-lg"><span class="font-semibold">{{ countTotalVisitsBasedOnCallPlan
                        }}</span> call plan tercapai oleh anda.</p>
                  </div>

                  <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200">
                    <router-link :to="{ name: 'absensi' }"
                      class="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 text-gray-950 bg-lime-300/50 hover:bg-lime-400/75 active:bg-gray-100 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center transition-all">
                      <span>Cek Detail</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                      </svg>
                    </router-link>
                    <router-link :to="{ name: 'absensi' }"
                      class="group flex items-center rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 size-8 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-calculator-fill" viewBox="0 0 16 16">
                        <path
                          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5m0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5z" />
                      </svg>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200">
                <div aria-hidden="true"
                  class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-orange-500 to-white blur-2xl opacity-25">
                </div>
                <div class="relative">
                  <div class="mt-2 pb-6 rounded-b-[--card-border-radius] space-y-2">
                    <h2 class="text-gray-900 text-2xl font-semibold">Total Absensi Visit</h2>
                    <p class="text-gray-700 text-lg">Anda melakukan absensi visit sebanyak <span
                        class="font-semibold">{{ countTotalVisits
                        }}</span> untuk bulan ini.</p>
                  </div>

                  <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200">
                    <a href="#"
                      class="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 text-gray-950 bg-orange-300/50 hover:bg-orange-400/75 active:bg-gray-100 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center transition-all">
                      <span>Cek Detail</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                      </svg>
                    </a>
                    <a href="#"
                      class="group flex items-center rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 size-8 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-camera2" viewBox="0 0 16 16">
                        <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4" />
                        <path
                          d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.97 5.97 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1M2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Swipe to right and left -->
        <div class="py-4">
          <h1 class="lg:px-20 md:px-10 lg:mx-40 md:mx-20 font-bold text-3xl text-gray-800">Promo Terkini</h1>
          <div class="flex overflow-x-scroll pb-4 hide-scroll-bar">
            <div class="flex flex-nowrap lg:ml-40 md:ml-20 space-x-4">
              <!-- Repeat this div for each item in your list -->
              <div
                class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/8d2ia-banner website 1587x621.jpg" alt="promo-pertama"
                  class="w-full h-full object-cover">
              </div>
              <div
                class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="/public/08e2b-banner-website-SA.png" alt="promo-pertama" class="w-full h-full object-cover">
              </div>
              <div
                class="w-80 h-48 max-w-xs overflow-hidden border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
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
import HeaderSection from '../components/HeaderSection.vue';
import { onMounted, ref } from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';

const user = ref(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

const storesData = ref([]);
const countTotalVisits = ref(0);
const countTotalVisitsBasedOnCallPlan = ref(0);

async function fetchStoresData(query = '') {
  try {
    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`
    };

    const response = await axios.get(`${API_URL.value}/api/v2/stores/call-plans`, {
      headers: headers,
      params: {
        q: query,
      },
    });

    storesData.value = response.data.resource;
  } catch (error) {
    console.error('Gagal memuat data toko: ', error);
  }
}

async function fetchTotalVisitsData(userNumber) {
  try {
    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`
    };

    const response = await axios.get(`${API_URL.value}/api/v2/salesmen/${userNumber}/visits/count`, {
      headers: headers
    });

    countTotalVisits.value = response.data.resource;
  } catch (error) {
    console.error('Gagal memuat data total visit pengguna: ', error);
  }
}

async function fetchTotalVisitBasedOnCallPlansData(userNumber) {
  try {
    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`
    };

    const response = await axios.get(`${API_URL.value}/api/v2/salesmen/${userNumber}/call-plans/visits/count`, {
      headers: headers
    });

    countTotalVisitsBasedOnCallPlan.value = response.data.resource;
  } catch (error) {
    console.error('Gagal memuat data total visit berdasarkan call plan pengguna: ', error);
  }
}

onMounted(() => {
  presentLoading();
  refreshAccessTokenHandler();
  fetchStoresData();
  fetchTotalVisitsData(user.value.number);
  fetchTotalVisitBasedOnCallPlansData(user.value.number);
  stopLoading();
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
