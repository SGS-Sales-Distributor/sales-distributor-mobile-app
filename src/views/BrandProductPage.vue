<template>
    <ion-page>
        <ion-content>
            <HeaderSection />

            <div class="flex min-h-full flex-col p-4">
                <div class="relative overflow-x-auto">
                    <div class="py-2 rounded-lg w-full">
                        <h2 v-if="brandId === 'DS'" class="text-2xl font-semibold text-center mb-4">List Produk Dewi Sri
                            Spa</h2>
                        <h2 v-else-if="brandId === 'PA'" class="text-2xl font-semibold text-center mb-4">List Produk PAC
                        </h2>
                        <h2 v-else-if="brandId === 'RB'" class="text-2xl font-semibold text-center mb-4">List Produk
                            Raine Beauty</h2>
                        <h2 v-else class="text-2xl font-semibold text-center mb-4">List Produk Smith</h2>
                        <p class="text-gray-600 text-center mb-6">Daftar Produk Terkini.</p>
                        
                        <ion-searchbar v-if="visibleProducts.length > 0" :debounce="300"
                            @ionInput="searchProductHandler($event)" placeholder="Cari nomor barang, nama barang..."
                            color="light"></ion-searchbar>

                        <div v-for="(product, index) in visibleProducts" :key="index + 1"
                            class="relative overflow-x-auto">
                            <ion-card class="py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800">
                                <ion-card-header class="bg-gray-50">
                                    <div class="flex flex-col w-full h-full space-y-2">
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Nomor
                                                Produk</label>
                                            <p class="flex-initial w-44 text-right">{{ product.prod_number }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama
                                                Produk</label>
                                            <p class="flex-initial w-44 text-right">{{ product.prod_name }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Harga
                                                Produk</label>
                                            <p class="flex-initial w-44 text-right">{{ new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(product.prod_base_price) }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Status
                                                Aktif</label>
                                            <div v-if="product.prod_status_id === 1"
                                                class="flex-initial w-44 text-right">
                                                <div
                                                    class="relative inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    <span class="absolute top-0 left-0 flex h-3 w-3">
                                                        <span
                                                            class="animate-ping absolute right-1 bottom-1 inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span
                                                            class="relative right-1 bottom-1 inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                    </span>
                                                    {{ product.status.product_status_name }}
                                                </div>
                                            </div>


                                            <div v-else class="flex-initial w-44 text-right">
                                                <span class="relative flex h-3 w-3">
                                                    <span class="w-4 h-4 bg-rose-500 rounded-full"></span>
                                                    <span class="w-4 h-4 bg-rose-500 rounded-full animate-ping"></span>
                                                    <span class="w-4 h-4 bg-rose-500 rounded-full animate-pulse"></span>
                                                </span>
                                                <span
                                                    class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{
                                                        product.status.product_status_name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </ion-card-header>
                            </ion-card>
                        </div>
                        <ion-infinite-scroll @ionInfinite="ionInfinite">
                            <ion-infinite-scroll-content loading-text="Load more products..."
                                loading-spinner="circular"></ion-infinite-scroll-content>
                        </ion-infinite-scroll>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { useRoute } from 'vue-router';
import HeaderSection from './../components/HeaderSection.vue'
import { computed, onMounted, ref } from 'vue';
import { IonSearchbar } from '@ionic/vue';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const route = useRoute();

const brandId = ref(route.params.id);
const brandProductsData = ref([]);

const lastIndex = ref(5);
const visibleProducts = computed(() => {
    return brandProductsData.value && brandProductsData.value.length > 0
        ? brandProductsData.value.slice(0, lastIndex.value)
        : [];
});
const reachedEnd = computed(() => {
    return Array.isArray(brandProductsData.value) && lastIndex.value >= brandProductsData.value.length;
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

function searchProductHandler(event) {
    const query = event.target.value.toLowerCase();

    fetchStoresData(query);
}

async function fetchBrandProductsData(brandId, query = "") {
    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/brands/${brandId}/products`, {
            headers: headers,
            params: {
                q: query
            },
        });

        console.log(response);

        brandProductsData.value = response.data.resource;
    } catch (error) {
        console.error(`Gagal memuat data produk dari brand ${brandId}: `, error);
    }
}

onMounted(() => {
    presentLoading();
    fetchBrandProductsData(brandId.value);
    stopLoading();
});
</script>

<style scoped></style>