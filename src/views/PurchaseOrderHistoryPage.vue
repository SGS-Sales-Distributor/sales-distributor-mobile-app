<template>
    <ion-page>
        <ion-content>
            <HeaderSection />

            <div class="flex min-h-full flex-col p-4">
                <div class="relative overflow-x-auto">
                    <div class="py-2 rounded-lg w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">List Purchase Order</h2>
                        <p class="text-gray-600 text-center mb-6">Daftar Purchase Order Terbaru.</p>

                        <div class="flex flex-col md:flew-row gap-3">
                            <ion-searchbar v-if="visiblePurchaseOrders.length > 0" :debounce="300"
                                class="justify-items-center items-center" @ionInput="searchStoreHandler($event)"
                                placeholder="Cari nomor order, nama toko..." color="light"></ion-searchbar>

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
                                            <button @click="fetchPurchaseOrdersData('latest')"
                                                class="block px-4 py-2 text-gray-900">Order Terbaru</button>
                                        </li>
                                        <li class="hover:bg-gray-100 ">
                                            <button @click="fetchPurchaseOrdersData('order-number-asc')"
                                                class="block px-4 py-2 text-gray-900">Nomor Order ASC</button>
                                        </li>
                                        <li class="hover:bg-gray-100 ">
                                            <button @click="fetchPurchaseOrdersData('order-number-desc')"
                                                class="block px-4 py-2 text-gray-900">Nomor Order ASC</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div v-for="(order, index) in visiblePurchaseOrders" :key="index + 1"
                            class="relative overflow-x-auto">
                            <ion-card class="py-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
                                <ion-card-header class="bg-gray-50">
                                    <div class="flex flex-col w-full h-full space-y-2">
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Nomor
                                                Order</label>
                                            <p class="flex-initial w-44 text-right">{{ order.no_order }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Tanggal
                                                Order</label>
                                            <p class="flex-initial w-44 text-right">{{ order.tgl_order }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Kode
                                                Toko</label>
                                            <p class="flex-initial w-44 text-right">{{ order.cust_code }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama
                                                Toko</label>
                                            <p class="flex-initial w-44 text-right">{{ order.store_name }}</p>
                                        </div>
                                        <div class="flex flex-row w-full h-full justify-between space-x-2">
                                            <label for="nama-toko"
                                                class="flex-initial w-56 font-semibold">Status</label>
                                            <p v-if="order.order_sts === 'Draft'" class="flex-initial w-44 text-right">
                                                <span
                                                    class="bg-gray-200 text-gray-900 text-sm font-medium me-2 px-2.5 py-0.5 rounded">{{
                                                        order.order_sts }}</span>
                                            </p>

                                            <p v-else class="flex-initial w-44 text-right">
                                                <span
                                                    class="bg-green-200 text-green-900 text-sm font-medium px-2.5 py-0.5 rounded">{{
                                                        order.order_sts }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </ion-card-header>
                                <ion-card-content class="bg-gray-50">
                                    <div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
                                        <ion-button shape="round" color="warning"
                                            @click="detailBtnHandler(true, order.id, order.no_order)">Detail</ion-button>
                                    </div>
                                </ion-card-content>
                            </ion-card>
                        </div>
                        <ion-infinite-scroll @ionInfinite="ionInfinite">
                            <ion-infinite-scroll-content loading-text="Load more orders..."
                                loading-spinner="circular"></ion-infinite-scroll-content>
                        </ion-infinite-scroll>
                    </div>
                </div>
            </div>

            <ion-modal :is-open="isOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Detail Order</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="setOpen(false)">Tutup</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>

                <ion-content>
                    <div class="relative flex min-h-screen flex-col items-center overflow-hidden">
                        <div class="relative bg-white px-6 mx-auto w-full max-w-lg rounded-2xl">
                            <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                                <div class="flex flex-col space-y-2">
                                    <div class="relative overflow-x-auto">
                                        <div class="py-6 rounded-lg max-w-sm-full w-full">
                                            <h2 class="text-xl font-semibold text-center mb-4">Detail Order {{
                                                selectedOrderNumber }}
                                            </h2>
                                            <div v-for="(detail, index) in purchaseOrderDetails" :key="index + 1"
                                                class="relative overflow-x-auto">
                                                <ion-card
                                                    class="py-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
                                                    <ion-card-header class="bg-gray-50">
                                                        <div class="flex flex-col w-full h-full space-y-2">
                                                            <div
                                                                class="flex flex-row w-full h-full justify-between space-x-2">
                                                                <label for="nama-toko"
                                                                    class="flex-initial w-56 font-semibold">Baris</label>
                                                                <p class="flex-initial w-44 text-right"># {{
                                                                    detail.lineNo }}</p>
                                                            </div>
                                                            <div
                                                                class="flex flex-row w-full h-full justify-between space-x-2">
                                                                <label for="nama-toko"
                                                                    class="flex-initial w-56 font-semibold">Kode
                                                                    Barang</label>
                                                                <p class="flex-initial w-44 text-right">{{
                                                                    detail.item_code }}</p>
                                                            </div>
                                                            <div
                                                                class="flex flex-row w-full h-full justify-between space-x-2">
                                                                <label for="nama-toko"
                                                                    class="flex-initial w-56 font-semibold">Nama
                                                                    Barang</label>
                                                                <p class="flex-initial w-44 text-right">{{
                                                                    detail.nama_produk }}</p>
                                                            </div>
                                                            <div
                                                                class="flex flex-row w-full h-full justify-between space-x-2">
                                                                <label for="nama-toko"
                                                                    class="flex-initial w-56 font-semibold">Kuantiti</label>
                                                                <p class="flex-initial w-44 text-right">{{
                                                                    detail.qty }} Pcs</p>
                                                            </div>
                                                        </div>
                                                    </ion-card-header>
                                                </ion-card>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ion-content>
            </ion-modal>

            <!-- Sheet Modal -->
            <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
                <ion-content class="ion-padding">
                    <div class="flex justify-start justify-items-start mx-auto mb-2">
                        <h2 class="text-gray-900 text-lg">
                            <span class="font-semibold">Urutkan</span>
                        </h2>
                    </div>
                    <div class="flex flex-wrap gap-x-3 gap-y-4">
                        <button type="button" @click="fetchPurchaseOrdersData('latest')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Order Terbaru
                            </span>
                        </button>
                        <button type="button" @click="fetchPurchaseOrdersData('store-name-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Toko ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchPurchaseOrdersData('store-name-desc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Nama Toko DESC
                            </span>
                        </button>
                        <button type="button" @click="fetchPurchaseOrdersData('order-number-asc')"
                            class="flex justify-items-center items-center gap-3 bg-gray-200 rounded-full px-3 py-1.5">
                            <span>
                                Urutkan ASC
                            </span>
                        </button>
                        <button type="button" @click="fetchPurchaseOrdersData('order-number-desc')"
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
import { computed, onMounted, ref } from 'vue';
import HeaderSection from './../components/HeaderSection.vue'
import { refreshAccessTokenHandler } from '@/services/auth';
import { catchToastError } from '@/services/toastHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const isOpen = ref(false);
const setOpen = (open) => (
    isOpen.value = open
);

const selectedOrderNumber = ref('');
const purchaseOrders = ref([]);
const purchaseOrderDetails = ref([]);

const lastIndex = ref(5);
const visiblePurchaseOrders = computed(() => {
    return purchaseOrders.value && purchaseOrders.value.length > 0
        ? purchaseOrders.value.slice(0, lastIndex.value)
        : [];
});
const reachedEnd = computed(() => {
    return Array.isArray(purchaseOrders.value) && lastIndex.value >= purchaseOrders.value.length;
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

    fetchPurchaseOrdersData(query);
}

function detailBtnHandler(open, orderId, orderNumber) {
    setOpen(open);
    selectedOrderNumber.value = orderNumber;
    fetchPurchaserOrderDetailData(orderId);
}

async function fetchPurchaserOrderDetailData(orderId) {
    setOpen(true);

    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/orders/${orderId}/details`, {
            headers: headers
        });

        purchaseOrderDetails.value = response.data.resource;
    } catch (error) {
        catchToastError("Failed to fetch order details data.", 3000);

        console.log("Failed to fetch order details data.", error);
    }
}

async function fetchPurchaseOrdersData(query = 'latest') {
    try {
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/orders`, {
            headers: headers,
            params: {
                q: query,
            }
        });

        purchaseOrders.value = response.data.resource;
    } catch (error) {
        catchToastError("Failed to fetch orders data.", 3000);

        console.log("Failed to fetch orders data.", error);
    }
}

onMounted(() => {
    presentLoading();
    refreshAccessTokenHandler();
    fetchPurchaseOrdersData();
    stopLoading();
})
</script>

<style scoped></style>