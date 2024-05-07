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

					<table class="w-full text-sm text-center rtl:text-right text-gray-500">
						<thead class="text-xs text-gray-50 font-bold uppercase bg-blue-400">
							<tr>
								<th scope="col" class="px-6 py-3 whitespace-nowrap">
									ID
								</th>
								<th scope="col" class="px-6 py-3 whitespace-nowrap">
									Aksi
								</th>
								<th scope="col" class="px-6 py-3 whitespace-nowrap">
									Nama Toko
								</th>
								<th scope="col" class="px-6 py-3 whitespace-nowrap">
									Tanggal Visit
								</th>
								<th scope="col" class="px-6 py-3 whitespace-nowrap">
									Waktu Check-In
								</th>
								<th scope="col" class="px-6 py-3 whitespace-nowrap">
									Waktu Check-Out
								</th>
								<th scope="col" class="px-6 py-3 whitespace-nowrap">
									Status Approval
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(store, index) in storeInfoDistri" :key="index + 1"
								class="odd:bg-sky-50 even:bg-blue-100 border-b border-gray-100 hover:bg-gray-50 transition-all">
								<th scope="row" class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
									{{ index + 1 }}
								</th>
								<td class="px-6 py-4">

									<ion-button :disabled="store.statusx" @click="fetchOneStoreData(store.store_id)"
										id="check-in-button" size="small">
										<ion-icon slot="start" :icon="camera"></ion-icon>
										Absen
										<!-- <img src="/public/icons8-purchase-50.png" alt="Sinergi Global Service" /> -->
									</ion-button>

									<router-link :to="{ name: 'storeDetail', params: { id: store.store_id } }">
										<ion-button :disabled="store.statusy" size="small">
											<ion-icon slot="start" :icon="document"></ion-icon>
											PO
											<!-- <img src="/public/icons8-purchase-50.png" alt="Sinergi Global Service" /> -->
										</ion-button>
									</router-link>
								</td>
								<td class="px-6 py-4">
									<span
										class="text-gray-900 font-medium whitespace-nowrap transition-all hover:text-blue-500 hover:font-normal">{{
											store.nama_toko }}</span>
								</td>
								<td v-if="store.tanggal_visit"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{{ new Date(store.tanggal_visit).toLocaleDateString('id-ID', {
										year: 'numeric',
										month: "long",
										day: "2-digit",
										weekday: "long"
									}) }}
								</td>
								<td v-else class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									<ion-badge color="danger">Belum Visit</ion-badge>
								</td>
								<td v-if="store.waktu_masuk"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{{ store.waktu_masuk }} WIB
								</td>
								<td v-else class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									<ion-badge color="danger">Belum Check-In Visit</ion-badge>
								</td>
								<td v-if="store.waktu_keluar"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{{ store.waktu_keluar }} WIB
								</td>
								<td v-else class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									<ion-badge color="danger">Belum Check-Out Visit</ion-badge>
									<!-- <span class="font-bold text-rose-600"></span> -->
								</td>
								<td class="px-6 py-4">
									<div v-if="store.approval === 1" class="flex items-center">
										<div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
										<ion-badge color="success">Disetujui</ion-badge>
									</div>
									<div v-else class="flex items-center">
										<div class="h-2.5 w-2.5 rounded-full bg-rose-600 me-2"></div>
										<ion-badge color="danger">Belum Disetujui</ion-badge>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
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
import { useRoute } from 'vue-router';
import { refreshAccessTokenHandler } from '@/services/auth.js';
import { catchToast, catchToastError } from '@/services/toastHandler';

const route = useRoute();

const storeData = ref(null);
const storeId = ref(route.params.id);

import { API_URL } from '@/services/globalVariables';
import router from '@/router';

function goBack() {
	setTimeout(() => {
		router.push({ name: 'absensi' });
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
	} catch (error) {
		catchToastError(error.message, 3000);

		console.log(`Failed to fetch store ${id}: `, error);
	}
}

onMounted(() => {
	fetchStoreDetailData(storeId.value);
});
</script>