<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- Header -->
            <HeaderSection />

            <div class="flex min-h-full flex-col p-4">
                <div class="relative overflow-x-auto">
                    <div class="py-2 rounded-lg max-w-sm-full w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">Direct Purchase Order</h2>
                        <p class="text-gray-600 text-center mb-6">Pilih toko yang ingin melakukan PO.</p>

                        <div class="flex flex-col md:flew-row gap-3">
                            <ion-searchbar :debounce="300" @ionInput="searchStoreHandler($event)"
                                class="justify-items-center items-center" placeholder="Cari nama toko..."
                                color="light"></ion-searchbar>

                            <div class="flex flex-row gap-3 mb-3 justify-items-start items-start mx-2">
                                <button id="open-modal"
                                    class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-sliders" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                                    </svg>
                                    <span>
                                        Filter
                                    </span>
                                </button>
                                <button id="sortOptionsDropdownBtn" data-dropdown-toggle="dropdown"
                                    class="text-gray-900 bg-gray-200 font-medium rounded-full px-3 py-1.5 text-center inline-flex items-center"
                                    type="button">Urutkan
                                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                <!-- Dropdown menu -->
                                <div id="dropdown"
                                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <ul class="py-2 text-sm text-gray-700" aria-labelledby="sortOptionsDropdownBtn">
                                        <li class="hover:bg-gray-100 ">
                                            <button @click="fetchStoresData('latest')"
                                                class="block px-4 py-2 text-gray-900">Toko Terbaru</button>
                                        </li>
                                        <li class="hover:bg-gray-100 ">
                                            <button @click="fetchStoresData('store-name-asc')"
                                                class="block px-4 py-2 text-gray-900">Nama Toko ASC</button>
                                        </li>
                                        <li class="hover:bg-gray-100 ">
                                            <button @click="fetchStoresData('store-name-desc')"
                                                class="block px-4 py-2 text-gray-900">Nama Toko DESC</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div v-for="(store, index) in visibleStores" :key="index + 1" class="relative overflow-x-auto">
                            <ion-card class="py-2 bg-gradient-to-r from-green-300 via-lime-400 to-lime-600">
                                <ion-card-header class="bg-white">
                                    <div class="flex flex-col w-full h-full space-y-2">
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama
                                                Toko</label>
                                            <p class="flex-initial w-44 text-right">{{ store.nama_toko }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Alamat
                                                Toko</label>
                                            <p class="flex-initial w-44 text-right">{{ store.alamat_toko }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Nomor
                                                Handphone</label>
                                            <p class="flex-initial w-44 text-right">{{ store.nomor_telepon_toko }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2"
                                            v-if="store.owners && store.owners.length">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama Pemilik
                                                Utama</label>
                                            <p class="flex-initial w-44 text-right">{{ store.owners[0].owner }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2"
                                            v-if="store.owners && store.owners.length">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">NIK Pemilik
                                                Utama</label>
                                            <p class="flex-initial w-44 text-right">{{ store.owners[0].nik_owner }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2"
                                            v-if="store.owners && store.owners.length">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Email Pemilik
                                                Utama</label>
                                            <p class="flex-initial w-44 text-right">{{ store.owners[0].email_owner }}
                                            </p>
                                        </div>
                                    </div>
                                </ion-card-header>
                                <ion-card-content class="bg-gray-50">
                                    <div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
                                        <ion-button shape="round" color="success"
                                            @click="redirectToDirectPurchaseOrderStoreDetailPage(store.store_id)">Pilih</ion-button>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </div>
                        <ion-infinite-scroll @ionInfinite="ionInfinite">
                            <ion-infinite-scroll-content loading-text="Load more stores..."
                                loading-spinner="circular"></ion-infinite-scroll-content>
                        </ion-infinite-scroll>
                    </div>
                </div>
            </div>

            <!-- Sheet Modal -->
            <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
                <ion-content class="ion-padding">
                    <div class="flex justify-start justify-items-start mx-auto mb-2">
                        <h2 class="text-gray-900 text-lg">
                            <span class="font-semibold">Urutkan</span>
                        </h2>
                    </div>
                    <div class="flex flex-wrap gap-x-3 gap-y-4">
                        <button type="button" @click="fetchStoresData('latest')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Toko Terbaru
                            </span>
                        </button>
                        <button type="button" @click="fetchStoresData('store-name-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Toko ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchStoresData('store-name-desc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Toko DESC
                            </span>
                        </button>
                        <button type="button" @click="fetchStoresData('store-code-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Urutkan ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchStoresData('store-code-desc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Urutkan DESC
                            </span>
                        </button>
                    </div>
                </ion-content>
            </ion-modal>
            <!-- End of Sheet Modal -->

        </ion-content>
    </ion-page>
</template>

<script setup>
import axios from 'axios';
import HeaderSection from './../components/HeaderSection.vue';
import { API_URL } from '@/services/globalVariables';
import { computed, onMounted, ref } from 'vue';
import { catchToastError } from '@/services/toastHandlers';
import { refreshAccessTokenHandler } from '@/services/auth';
import { redirectToDirectPurchaseOrderStoreDetailPage } from '@/services/redirectHandlers';
import { IonSearchbar } from '@ionic/vue';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const storesData = ref([]);
const lastIndex = ref(5);
const visibleStores = computed(() => {
    return storesData.value && storesData.value.length > 0
        ? storesData.value.slice(0, lastIndex.value)
        : [];
});
const reachedEnd = computed(() => {
    return Array.isArray(storesData.value) && lastIndex.value >= storesData.value.length;
});

const ionInfinite = (event) => {
    if (!reachedEnd.value) {
        setTimeout(() => {
            lastIndex.value += 5;

            event.target.complete();
        }, 1000);
    } else {
        event.target.disabled = true;
    }
}

function searchStoreHandler(event) {
    const query = event.target.value.toLowerCase();

    fetchStoresData(query);
}

async function fetchStoresData(query = '') {
    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/stores`, {
            headers: headers,
            params: {
                q: query
            },
        });

        storesData.value = response.data.resource;
    } catch (error) {
        catchToastError("Failed to fetch store data.", 3000);

        console.log("Failed to fetch store data.", error);
    }
}

onMounted(() => {
    presentLoading();
    refreshAccessTokenHandler();
    fetchStoresData();
    stopLoading();
});
</script>

<style scoped></style>