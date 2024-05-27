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

                        <div class="flex flex-col md:flew-row gap-3" id="button-group">
                            <ion-searchbar v-if="visibleProducts.length > 0" :debounce="300"
                                class="justify-items-center items-center" @ionInput="searchProductHandler($event)"
                                placeholder="Cari nomor barang, nama barang..." color="light"></ion-searchbar>

                            <div class="flex flex-row gap-3 mb-3 justify-items-start items-start mx-2"
                                id="button-group">
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
                                <button id="someDropdown" data-dropdown-toggle="customDropdown"
                                    class="text-gray-900 bg-gray-200 font-medium rounded-full px-3 py-1.5 text-center inline-flex items-center"
                                    type="button">Urutkan
                                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>

                                <!-- Dropdown menu -->
                                <div id="customDropdown"
                                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <ul class="py-2 text-sm text-gray-700" aria-labelledby="someDropdown">
                                        <li class="hover:bg-gray-100">
                                            <button @click="fetchBrandProductsData(brandId, 'latest')"
                                                class="block px-4 py-2 text-gray-900">Produk Terbaru</button>
                                        </li>
                                        <li class="hover:bg-gray-100">
                                            <button @click="fetchBrandProductsData(brandId, 'highest-price')"
                                                class="block px-4 py-2 text-gray-900">Harga Tertinggi</button>
                                        </li>
                                        <li class="hover:bg-gray-100">
                                            <button @click="fetchBrandProductsData(brandId, 'lowest-price')"
                                                class="block px-4 py-2 text-gray-900">Harga Terendah</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div v-for="(product, index) in visibleProducts" :key="index + 1"
                            class="relative overflow-x-auto">
                            <ion-card class="py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800">
                                <ion-card-header class="bg-gray-50">
                                    <div class="flex flex-col w-full h-full space-y-2">
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nomor-produk" class="flex-initial w-56 font-semibold">Nomor
                                                Produk</label>
                                            <p class="flex-initial w-44 text-right">{{ product.prod_number }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-produk" class="flex-initial w-56 font-semibold">Nama
                                                Produk</label>
                                            <p class="flex-initial w-44 text-right">{{ product.prod_name }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="harga-produk" class="flex-initial w-56 font-semibold">Harga
                                                Produk</label>
                                            <p class="flex-initial w-44 text-right">{{ new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(product.prod_base_price) }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="status-aktif" class="flex-initial w-56 font-semibold">Status
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

            <!-- Sheet Modal -->
            <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
                <ion-content class="ion-padding">
                    <div class="flex justify-start justify-items-start mx-auto mb-2">
                        <h2 class="text-gray-900 text-lg">
                            <span class="font-semibold">Urutkan</span>
                        </h2>
                    </div>
                    <div class="flex flex-wrap gap-x-3 gap-y-4">
                        <button type="button" @click="fetchBrandProductsData(brandId, 'latest')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Produk Terbaru
                            </span>
                        </button>
                        <button type="button" @click="fetchBrandProductsData(brandId, 'product-name-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Produk ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchBrandProductsData(brandId, 'product-name-desc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Produk DESC
                            </span>
                        </button>
                        <button type="button" @click="fetchBrandProductsData(brandId, 'product-number-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Urutkan ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchBrandProductsData(brandId, 'product-number-desc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Urutkan DESC
                            </span>
                        </button>
                        <button type="button" @click="fetchBrandProductsData(brandId, 'highest-price')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Harga Tertinggi
                            </span>
                        </button>
                        <button type="button" @click="fetchBrandProductsData(brandId, 'lowest-price')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Harga Terendah
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
import { useRoute } from 'vue-router';
import HeaderSection from './../components/HeaderSection.vue'
import { computed, onMounted, ref } from 'vue';
import { IonSearchbar } from '@ionic/vue';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { refreshAccessTokenHandler } from '@/services/auth';
import { initFlowbite } from 'flowbite';

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
    refreshAccessTokenHandler();
    initFlowbite();
    fetchBrandProductsData(brandId.value, 'latest');
    stopLoading();
});
</script>

<style scoped></style>