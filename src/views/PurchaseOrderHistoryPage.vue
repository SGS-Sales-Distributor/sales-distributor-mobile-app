<template>
    <ion-page>
        <ion-content>
            <HeaderSection />

            <div class="flex min-h-full flex-col p-4">
                <div class="relative overflow-x-auto">
                    <div class="py-2 rounded-lg max-w-sm-full w-full">
                        <h2 class="text-2xl font-semibold text-center mb-4">List Purchase Order</h2>
                        <p class="text-gray-600 text-center mb-6">Daftar Purchase Order Terbaru.</p>

                        <ion-searchbar v-if="visiblePurchaseOrders.length > 0" :debounce="300"
                            @ionInput="searchStoreHandler($event)" placeholder="Cari nomor order, nama toko..."
                            color="light"></ion-searchbar>

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
        const response = await axios.get(`${API_URL.value}/api/sgs/order_customer_sales_detail/${orderId}`);

        purchaseOrderDetails.value = response.data.data;
    } catch (error) {
        catchToastError("Failed to fetch order details data.", 3000);

        console.log("Failed to fetch order details data.", error);
    }
}

async function fetchPurchaseOrdersData(query = '') {
    try {
        const response = await axios.get(`${API_URL.value}/api/sgs/purchase-orders`, {
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