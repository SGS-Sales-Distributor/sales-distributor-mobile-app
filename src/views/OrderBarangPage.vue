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
            <ion-searchbar :debounce="300" @ionInput="handleInput($event)"></ion-searchbar>
            <br>
            <!-- <ion-input label="Cari Barang" label-placement="floating" placeholder="Enter text" class="py-4 border border-gray-300" fill="solid"></ion-input> -->
            <ion-item-group v-for="(product, index) in productsData" :key="index+1">
                <ion-item-divider>
                  <ion-label>{{ index+1 }}</ion-label>
                </ion-item-divider>
          
                <ion-item>
                    <ion-grid>
                        <ion-row>
                          <ion-col size="6" size-md="4" size-lg="2">{{ product.prod_number }}</ion-col>
                          <ion-col size="6" size-md="4" size-lg="2">{{ product.prod_name }}</ion-col>
                          <ion-col size="6" size-md="4" size-lg="2">stock_terkini</ion-col>
                          <ion-col size="6" size-md="4" size-lg="2">
                            <ion-button shape="round" color="success" @click="orderProduct(product.prod_number, product.prod_name, 5)">
                                Pilih
                            </ion-button>
                          </ion-col>                         
                        </ion-row>
                    </ion-grid>
                </ion-item>
                
            </ion-item-group>
            <!--  -->
        </ion-content>
    </ion-page>    
</template>

<script setup>
import axios from 'axios';

import {
	chevronBackOutline,
    ellipsisVerticalOutline
} from 'ionicons/icons'

import { onMounted, ref } from 'vue';

import router from '@/router';

import { refreshAccessTokenHandler } from '@/services/auth.js';
import { catchToastError } from '@/services/toastHandlers';
import { objOrder } from '@/services/globalVariables';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { redirectToStoreDetailPage } from '@/services/redirectHandlers';

const API_URL = `${import.meta.env.VITE_API_HOST}:${parseInt(import.meta.env.VITE_API_PORT)}`;
const productsData = ref([]);

const storeData = localStorage.getItem("store");

function handleInput(event) {
    const query = event.target.value.toLowerCase();
    fetchProductsData(query);
}

function orderProduct(prodNumber, prodName, stock) {
    const pilihan = {
        prodNumber: prodNumber,
        prodName: prodName,
        stock: stock,
        qty: 0,
    };

    objOrder.value.push(pilihan);
    
    presentLoading();
    
    goBack();

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

        const response = await axios.get(`${API_URL}/api/v2/products`, {
            headers: headers,
            params: {
                q: query
            }
        });

        productsData.value = response.data.resource.data;

        console.log("Success fetch products data: ", productsData.value);
    } catch (error) {
        catchToastError(error.message, 3000);
        
        console.error("Failed to fetch product data: ", error);
    } finally {
        stopLoading();
    }
}

onMounted(() => {
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