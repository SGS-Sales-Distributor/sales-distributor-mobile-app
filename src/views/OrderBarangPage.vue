<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <!-- Header -->
            <header class="bg-transparent p-4 rounded-b-3xl">
                <div class="flex justify-between">
                    <div>
                        <button type="button"
                            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                            @click="redirectToStoreDetailPage(storeData.store_id)">
                            <ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
                        </button>
                    </div>
                    <div class="flex items-center justify-center">
                        <h2 class="text-center">
                            Master Product
                        </h2>
                    </div>
                    <div class="text-md">
                        <button type="button"
                            class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <icon-button>
                                <ion-icon class="text-2xl" :icon="ellipsisVerticalOutline" color="dark"></ion-icon>
                            </icon-button>
                        </button>
                    </div>
                </div>
            </header>

            <ion-searchbar :debounce="300" @ionInput="handleInput($event)" placeholder="Cari nama, nomor produk..." color="light"></ion-searchbar>

            <div v-for="(product, index) in visibleProducts" :key="index + 1" class="relative overflow-x-auto">
                <ion-card class="py-2 odd:bg-blue-500 even:bg-sky-400">
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
                                <p class="flex-initial w-44 text-right">RP. {{ parseFloat(product.prod_base_price).toFixed(3) }}</p>
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
                            @click="orderProduct(product.prod_number, product.prod_name, 5, product.prod_base_price)">Pilih</ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
            <ion-infinite-scroll @ionInfinite="ionInfinite">
                <ion-infinite-scroll-content loading-text="Load more products..." loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>

<script setup>
import axios from 'axios';

import {
    chevronBackOutline,
    ellipsisVerticalOutline
} from 'ionicons/icons'

import { computed, onMounted, ref } from 'vue';

import { refreshAccessTokenHandler } from '@/services/auth.js';
import { catchToastError } from '@/services/toastHandlers';
import { objOrder, API_URL } from '@/services/globalVariables';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { redirectToStoreDetailPage } from '@/services/redirectHandlers';

const productsData = ref([]);
const lastIndex = ref(5);
const visibleProducts = computed(() => productsData.value.slice(0, lastIndex.value));
const reachedEnd = computed(() => lastIndex.value >= productsData.value.length);

const storeData = localStorage.getItem("store");

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
    };

    objOrder.value.push(productData);

    presentLoading();

    redirectToStoreDetailPage(storeData.store_id);

    stopLoading();
}

async function fetchProductsData(query = '') {
    try {
        refreshAccessTokenHandler();

        presentLoading();

        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/v2/products`, {
            headers: headers,
            params: {
                q: query
            }
        });

        productsData.value = response.data.resource.data;

        stopLoading();
    } catch (error) {
        catchToastError(error.message, 3000);

        console.error("Failed to fetch product data: ", error);
    } finally {
        stopLoading();
    }
}

onMounted(() => {
    refreshAccessTokenHandler();
    fetchProductsData();
});
</script>

<style>
ion-col {
    background-color: rgb(244, 248, 255);
    border: solid 1px #fff;
    color: black;
    text-align: center;
}
</style>