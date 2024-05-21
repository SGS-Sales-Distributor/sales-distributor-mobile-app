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
                        <ion-searchbar :debounce="300" @ionInput="searchStoreHandler($event)"
                            placeholder="Cari nama toko..." color="light"></ion-searchbar>
                        <div v-for="(store, index) in visibleStores" :key="index + 1" class="relative overflow-x-auto">
                            <ion-card class="py-2 bg-lime-500">
                                <ion-card-header class="bg-gray-50">
                                    <div class="flex flex-col w-full h-full space-y-2">
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">ID Toko</label>
                                            <p class="flex-initial w-44 text-right">{{ store.store_id }}</p>
                                        </div>
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
                                            @click="redirectToStoreDetailPage(store.store_id)">Pilih</ion-button>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </div>
                        <ion-infinite-scroll @ionInfinite="ionInfinite">
                            <ion-infinite-scroll-content loading-text="Load more stores..."
                                loading-spinner="bubbles"></ion-infinite-scroll-content>
                        </ion-infinite-scroll>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import axios from 'axios';
import HeaderSection from './../components/HeaderSection.vue';
import { API_URL, currentRoute } from '@/services/globalVariables';
import { computed, onMounted, ref } from 'vue';
import { catchToastError } from '@/services/toastHandlers';
import { refreshAccessTokenHandler } from '@/services/auth';
import { redirectToStoreDetailPage } from '@/services/redirectHandlers';
import { useRoute } from 'vue-router';
import { IonSearchbar } from '@ionic/vue';

const route = useRoute();
const currentPageRouteName = computed(() => route.name);

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
        refreshAccessTokenHandler();

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

        storesData.value = response.data.resource.data;

        console.log(response);
    } catch (error) {
        catchToastError("Failed to fetch store data.", 3000);

        console.log("Failed to fetch store data.", error);
    }
}

onMounted(() => {
    currentRoute.value = currentPageRouteName.value;

    fetchStoresData();
})
</script>

<style scoped></style>