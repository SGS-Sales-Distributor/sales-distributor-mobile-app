<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<!-- Header -->
			<header class="bg-transparent p-4 rounded-b-3xl">
				<div class="flex justify-between">
					<div>
						<button type="button"
							class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
							@click="goBack">
							<ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
						</button>
					</div>
					<div class="flex items-center justify-center">
						<h2 class="text-center" v-if="storeData">
							Dari toko <span class="font-semibold">{{ storeData.nama_toko }}</span>
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
			<!-- End of header -->
			<div class="container mx-auto">
				<div class="flex flex-col mih-h-full p-6">
					<div v-if="storeData">
						<p class="text-center text-xl"></p>
					</div>

					<!-- Detail Store Card -->
					<div class="flex flex-col space-y-2 mb-6" id="store-detail-card">
						<ion-card v-if="storeData" class="shadow-lg shadow-gray-300">
							<ion-card-header>
								<div class="flex justify-between">
									<ion-card-title>
										<span class="font-bold text-gray-900 text-2xl">Data Detail Toko</span>
									</ion-card-title>
									<button id="close-btn" @click="closeButtonHandler"
										class="text-gray-900 hover:text-gray-700 transition-all">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
											fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
											<path
												d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
										</svg>
									</button>
								</div>
								<ion-card-subtitle>
									<span class="font-medium text-gray-900">
										Data dari toko <span class="font-bold">{{ storeData.nama_toko }}</span> secara
										detail.
									</span>
								</ion-card-subtitle>
							</ion-card-header>

							<ion-card-content>
								<div class="border-t border-gray-200">
									<dl>
										<div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nama Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nama_toko }}
											</dd>
										</div>
										<div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nama Alias Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.alias_toko }}
											</dd>
										</div>
										<div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Alamat Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.alamat_toko }}
											</dd>
										</div>
										<div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nomor Telepon Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nomor_telepon_toko }}
											</dd>
										</div>
										<div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nomor Fax Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nomor_fax_toko }}
											</dd>
										</div>
										<div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Kode Unik Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.kode_toko }}
											</dd>
										</div>
										<div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nama Pemilik Toko
											</dt>
											<dd v-if="storeData.nama_pemilik_toko"
												class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nama_pemilik_toko }}
											</dd>
											<dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												<ion-badge color="danger">Tidak Ada</ion-badge>
											</dd>
										</div>
										<div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Email Pemilik Toko
											</dt>
											<dd v-if="storeData.email_pemilik_toko"
												class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.email_pemilik_toko }}
											</dd>
											<dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												<ion-badge color="danger">Tidak Ada</ion-badge>
											</dd>
										</div>
									</dl>
								</div>
							</ion-card-content>
						</ion-card>
					</div>
					<!-- End of Detail Store Card -->

					<div class="flex justify-between items-center mb-2">
						<button
						@click="goToOrder" 
						data-modal-target="large-modal" 
						data-modal-toggle="large-modal" 
						class="block w-full md:w-auto text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
							Tambah Order
						</button>
					</div>

					<!-- Large Modal -->
					<div id="large-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
						<div class="relative w-full max-w-4xl max-h-full">
							<!-- Modal content -->
							<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
								<!-- Modal header -->
								<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
									<h3 class="text-xl font-medium text-gray-900 dark:text-white">
										Large modal
									</h3>
									<button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="large-modal">
										<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
											<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
										</svg>
										<span class="sr-only">Close modal</span>
									</button>
								</div>
								<!-- Modal body -->
								<div class="p-4 md:p-5 space-y-4">
									<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
									</p>
									<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
									</p>
								</div>
								<!-- Modal footer -->
								<div class="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
									<button data-modal-hide="large-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
									<button data-modal-hide="large-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
								</div>
							</div>
						</div>
					</div>
					<h6 class="text-center font-bold mb-4">Daftar Order</h6>
					<div class="relative overflow-x-auto shadow-lg shadow-gray-300 rounded-lg">
						<table class="w-full text-sm text-center rtl:text-right text-gray-500">
							<thead class="text-xs text-gray-50 font-bold uppercase bg-blue-400">
								<tr>
									<th scope="col" class="px-6 py-3 whitespace-nowrap">
										No.
									</th>
									<th scope="col" class="px-6 py-3 whitespace-nowrap">
										Kode Produk
									</th>
									<th scope="col" class="px-6 py-3 whitespace-nowrap">
										Nama Produk
									</th>
									<th scope="col" class="px-6 py-3 whitespace-nowrap">
										Stock
									</th>
									<th scope="col" class="px-6 py-3 whitespace-nowrap">
										Qty
									</th>
									<th scope="col" class="px-6 py-3 whitespace-nowrap">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(order, index) in objOrder" :key="index + 1"
									class="odd:bg-sky-50 even:bg-blue-100 border-b border-gray-100 hover:bg-gray-50 transition-all">
									<th scope="row" class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
										{{ index + 1 }}
									</th>
									<td class="px-6 py-4">
										<span
											class="text-gray-900 font-medium whitespace-nowrap transition-all hover:text-blue-500 hover:font-normal">{{
												order.prodNumber }}</span>
									</td>
									<td class="px-6 py-4">
										<span
											class="text-gray-900 font-medium whitespace-nowrap transition-all hover:text-blue-500 hover:font-normal">{{
												order.prodName }}</span>
									</td>
									<td class="px-6 py-4">
										<span
											class="text-gray-900 font-medium whitespace-nowrap transition-all hover:text-blue-500 hover:font-normal">{{
												order.stock }}</span>
									</td>
									<td class="px-6 py-4">
										<ion-button size="small" @click="minusOrder(index, 0)">
											<ion-icon slot="icon-only" :icon="removeOutline"></ion-icon>
										</ion-button>
										<input
										id="orderInput"
										:value="order.qty"
										type="number"
										pattern="[0-9]"
										style="width: 8em"
										min="0"
										:max="order.stock"
										readonly
										/>
										<ion-button size="small" @click="plusOrder(index, order.stock)">
											<ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
										</ion-button>
									</td>
									<td class="px-6 py-4">
										<ion-button color="danger" @click="hapusOrder(index)">Hapus</ion-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>	
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import axios from 'axios';
import {
	chevronBackOutline,
	ellipsisVerticalOutline,
	removeOutline,
	addOutline,
} from 'ionicons/icons'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { refreshAccessTokenHandler } from '@/services/auth.js';
import { catchToast, catchToastError } from '@/services/toastHandler';
import { objOrder } from '@/services/globalVariables';

const route = useRoute();
const renderLoading = ref(null);

const storeData = ref(null);
const storeId = ref(route.params.id);
const productsData = ref([]);

import { API_URL } from '@/services/globalVariables';
import router from '@/router';
import { loadingController, toastController } from '@ionic/vue';

function minusOrder(index, min) {
	objOrder.value[index].qty -= 1;

	if (objOrder.value[index].qty < min) {
		catchToastError("Tidak boleh order kurang dari 0", 3000);
		
		objOrder.value[index].qty = min;
	}
}

function plusOrder(index, maks) {
	objOrder.value[index].qty += 1;

	if (objOrder.value[index].qty > maks) {
		catchToastError(`Tidak boleh order melebihi dari ${maks}`, 3000);

		objOrder.value[index].qty = maks;
	}
}

function hapusOrder(index) {
	objOrder.value.splice(index, 1);
}

function goBack() {
	setTimeout(() => {
		router.push({ name: 'absensi' });
	}, 100);
}

function goToOrder() {
	setTimeout(() => {
		router.push({ name: 'orderBarang', params: { id: storeId.value}});
	}, 100);
}

function disableTypeInputNumber() {
	const input = document.getElementById("orderInput");
	input.addEventListener("keypress", (event) => {
		event.preventDefault();
	});
}

function presentLoading() {
  renderLoading.value = loadingController.create({
      message: "Loading...",
    })
    .then((a) => a.present());
  
    return renderLoading.value;
}

function stopLoading() {
  setTimeout(() => {
    loadingController.dismiss();
  }, 100);
}

async function fetchStoreDetailData(id) {
	try {
		refreshAccessTokenHandler();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokens.access_token}`
		};

		const response = await axios.get(`${API_URL.value}/api/v2/stores/${id}`, {
			headers: headers
		});

		storeData.value = response.data.resource;

		localStorage.setItem("store", storeData.value);

	} catch (error) {
		catchToastError(error.message, 3000);

		console.log(`Failed to fetch store ${id}: `, error);
	}
}

async function fetchProductsData(query = '') {
	try {
		refreshAccessTokenHandler();

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
		
		console.log("Success fetch products data: ", response);
	} catch (error) {
		catchToastError(error.message, 3000);

		console.error("Failed to fetch products data: ", error);
	}
}

onMounted(() => {
	fetchStoreDetailData(storeId.value);
	fetchProductsData();
});
</script>