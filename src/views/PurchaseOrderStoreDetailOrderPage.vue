<template>
    <ion-page>
        <ion-content>
            <!-- Header -->
            <header class="bg-transparent p-4 rounded-b-3xl">
                <div class="flex justify-between">
                    <div>
                        <button type="button"
                            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                            @click="redirectToDirectPurchaseOrderStoreDetailPage(storeId)">
                            <ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
                        </button>
                    </div>
                    <div class="flex items-center justify-center">
                        <h2 class="text-center">
                            Direct PO Master Product
                        </h2>
                    </div>
                    <div class="text-md">
                        <button type="button"
                            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <button>
                                <ion-icon class="text-2xl" :icon="ellipsisVerticalOutline" color="dark"></ion-icon>
                            </button>
                        </button>
                    </div>
                </div>
            </header>
            <!-- End of Header -->

            <!-- Start of Brand List -->
            <ion-list>
                <ion-item>
                    <ion-select @ionChange="handleChange($event)" @ionCancel="cancelSelectionHandler()"
                        label="Daftar Brand" interface="action-sheet" :value="selectedBrand" placeholder="Pilih Brand"
                        cancel-text="Batalkan Pilihan">
                        <ion-select-option v-for="(brand, index) in brandsData" :key="index + 1"
                            :value="brand.brand_id">{{ brand.brand_name }}</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
            <!-- End of Brand List -->

            <div class="flex flex-col md:flew-row gap-3">
                <ion-searchbar v-if="selectedBrandBtn" :debounce="300" @ionInput="handleInput($event)"
                    class="justify-items-center items-center" placeholder="Cari nama, nomor produk..." color="light">
                </ion-searchbar>

                <div class="flex flex-row gap-3 mb-3 justify-items-start items-start mx-2" id="button-group">
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
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <!-- Dropdown menu -->
                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="sortOptionsDropdownBtn">
                            <li class="hover:bg-gray-100 ">
                                <button @click="fetchProductsData(selectedBrand, 'latest')"
                                    class="block px-4 py-2 text-gray-900">Produk Terbaru</button>
                            </li>
                            <li class="hover:bg-gray-100 ">
                                <button @click="fetchProductsData(selectedBrand, 'product-number-asc')"
                                    class="block px-4 py-2 text-gray-900">Nomor Produk ASC</button>
                            </li>
                            <li class="hover:bg-gray-100 ">
                                <button @click="fetchProductsData(selectedBrand, 'product-number-desc')"
                                    class="block px-4 py-2 text-gray-900">Nomor Produk ASC</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-for="(product, index) in visibleProducts" :key="index + 1" class="relative overflow-x-auto">
                <ion-card class="py-2 bg-gradient-to-r from-green-300 via-lime-400 to-lime-600">
                    <ion-card-header class="bg-gray-50">
                        <div class="flex flex-col w-full h-full space-y-2">
                            <div class="flex flex-row w-full h-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Nomor Produk</label>
                                <p class="flex-initial w-44 text-right">{{ product.prod_number }}</p>
                            </div>
                            <div class="flex flex-row w-full h-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama Produk</label>
                                <p class="flex-initial w-44 text-right">{{ product.prod_name }}</p>
                            </div>
                            <div class="flex flex-row w-full h-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Harga Produk</label>
                                <p class="flex-initial w-44 text-right">{{ new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR'
                                }).format(product.prod_base_price) }}</p>
                            </div>
                            <div class="flex flex-row w-full h-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Total Stok</label>
                                <p class="flex-initial w-44 text-right">Stok Terkini</p>
                            </div>
                        </div>
                    </ion-card-header>
                    <ion-card-content class="bg-gray-50">
                        <div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
                            <ion-button shape="round" color="success"
                                @click="orderProduct(product.prod_number, product.prod_name, 5, product.prod_base_price)"
                                :disabled="selectedProduct.includes(product.prod_number)">Pilih</ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
            <ion-infinite-scroll @ionInfinite="ionInfinite">
                <ion-infinite-scroll-content loading-text="Load more products..."
                    loading-spinner="circular"></ion-infinite-scroll-content>
            </ion-infinite-scroll>

            <!-- Sheet Modal -->
            <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
                <ion-content class="ion-padding">
                    <div class="flex justify-start justify-items-start mx-auto mb-2">
                        <h2 class="text-gray-900 text-lg">
                            <span class="font-semibold">Urutkan</span>
                        </h2>
                    </div>
                    <div class="flex flex-wrap gap-x-3 gap-y-4">
                        <button type="button" @click="fetchProductsData(selectedBrand, 'latest')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Produk Terbaru
                            </span>
                        </button>
                        <button type="button" @click="fetchProductsData(selectedBrand, 'product-name-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Produk ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchProductsData(selectedBrand, 'product-name-desc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Produk DESC
                            </span>
                        </button>
                        <button type="button" @click="fetchProductsData(selectedBrand, 'product-number-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Urutkan ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchProductsData(selectedBrand, 'product-number-desc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Urutkan DESC
                            </span>
                        </button>
                        <button type="button" @click="fetchProductsData(selectedBrand, 'highest-price')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Harga Tertinggi
                            </span>
                        </button>
                        <button type="button" @click="fetchProductsData(selectedBrand, 'lowest-price')"
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
import {
    chevronBackOutline,
    ellipsisVerticalOutline
} from 'ionicons/icons'
import { redirectToDirectPurchaseOrderStoreDetailPage } from '@/services/redirectHandlers';
import { IonSearchbar, IonSelect, IonSelectOption } from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import { refreshAccessTokenHandler } from '@/services/auth';
import axios from 'axios';
import { catchToastError } from '@/services/toastHandlers';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { objOrder, API_URL, selectedProduct } from '@/services/globalVariables';

const route = useRoute();
const storeId = ref(route.params.id);

const productsData = ref([]);
const selectedBrand = ref(null);
const showButton = ref(false);
const selectedBrandBtn = ref(false);
const brandsData = ref([]);

const lastIndex = ref(5);
const visibleProducts = computed(() => {
    return productsData.value && productsData.value.length > 0
        ? productsData.value.slice(0, lastIndex.value)
        : [];
});
const reachedEnd = computed(() => {
    return Array.isArray(productsData.value) && lastIndex.value >= productsData.value.length;
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

function handleChange(event) {
    selectedBrandBtn.value = true;
    showButton.value = true;

    selectedBrand.value = event.detail.value;

    fetchProductsData(selectedBrand.value);
}

function cancelSelectionHandler() {
    selectedBrandBtn.value = false;

    productsData.value = [];
}

function handleInput(event) {
    const query = event.target.value.toLowerCase();
    fetchProductsData(query);
}

function orderProduct(prodNumber, prodName, stock, hargaProduk) {
    const productData = {
        prodNumber: prodNumber,
        prodName: prodName,
        stock: stock,
        prodPrice: hargaProduk,
        qty: 0,
        statusBonus: 0,
    };

    objOrder.value.push(productData);

    if (!selectedProduct.value.includes(prodNumber)) {
        selectedProduct.value.push(prodNumber);
    }

    redirectToDirectPurchaseOrderStoreDetailPage(storeId.value);
}

async function fetchProductsData(query = '', sortQuery = '') {
    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/products`, {
            headers: headers,
            params: {
                q: query,
                sort: sortQuery,
            }
        });

        productsData.value = response.data.resource;

        console.log(productsData.value);
    } catch (error) {
        catchToastError("Failed to fetch product data", 3000);

        console.error("Failed to fetch product data: ", error);
    }
}

async function fetchBrandsData(query = '') {
    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/brands`, {
            headers: headers,
            params: {
                q: query
            }
        });

        brandsData.value = response.data.resource.data;
    } catch (error) {
        catchToastError("Failed to fetch brand data", 3000);

        console.error("Failed to fetch brand data: ", error);
    }
}

onMounted(() => {
    presentLoading();
    refreshAccessTokenHandler();
    fetchBrandsData();
    stopLoading();
});
</script>

<style scoped></style>