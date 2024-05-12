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
							Toko <span class="font-semibold">{{ storeData.nama_toko }}</span>
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
						<button @click="goToOrder" data-modal-target="large-modal" data-modal-toggle="large-modal"
							class="block w-full md:w-auto text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							type="button">
							Tambah Order
						</button>
					</div>

					<!-- Large Modal -->
					<div id="large-modal" tabindex="-1"
						class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
						<div class="relative w-full max-w-4xl max-h-full">
							<!-- Modal content -->
							<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
								<!-- Modal header -->
								<div
									class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
									<h3 class="text-xl font-medium text-gray-900 dark:text-white">
										Large modal
									</h3>
									<button type="button"
										class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
										data-modal-hide="large-modal">
										<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
											fill="none" viewBox="0 0 14 14">
											<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
												stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
										</svg>
										<span class="sr-only">Close modal</span>
									</button>
								</div>
								<!-- Modal body -->
								<div class="p-4 md:p-5 space-y-4">
									<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										With less than a month to go before the European Union enacts new consumer
										privacy laws for its citizens, companies around the world are updating their
										terms of service agreements to comply.
									</p>
									<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										The European Union’s General Data Protection Regulation (G.D.P.R.) goes into
										effect on May 25 and is meant to ensure a common set of data rights in the
										European Union. It requires organizations to notify users as soon as possible of
										high-risk data breaches that could personally affect them.
									</p>
								</div>
								<!-- Modal footer -->
								<div
									class="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
									<button data-modal-hide="large-modal" type="button"
										class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
										accept</button>
									<button data-modal-hide="large-modal" type="button"
										class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
								</div>
							</div>
						</div>
					</div>
					<h6 v-if="objOrder.length > 0" class="text-center font-bold py-4">Daftar Order</h6>
					<ion-item-group v-for="(order, index) in objOrder" :key="index + 1">
						<ion-item-divider>
							<ion-label>{{ index + 1 }}</ion-label>
						</ion-item-divider>

						<ion-item>
							<ion-grid>
								<ion-row>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: left;">Kode
										Produk</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: right;">{{
										order.prodNumber }}</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: left;">Nama
										Produk</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: right;">{{
										order.prodName }}</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: left;">Stock</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: right;">{{ order.stock
										}}</ion-col>
									<ion-col size="6" size-md="4" size-lg="2"
										style="text-align: left;">Quantity</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: right;">
										<ion-button size="small" @click="minusOrder(index, 0)">
											<ion-icon slot="icon-only" :icon="removeOutline"></ion-icon>
										</ion-button>
										<input id="orderInput" :value="order.qty" type="number" pattern="[0-9]" size="2"
											min="0" :max="order.stock" readonly />
										<ion-button size="small" @click="plusOrder(index, order.stock)">
											<ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
										</ion-button>
									</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: left;">Aksi</ion-col>
									<ion-col size="6" size-md="4" size-lg="2" style="text-align: right;">
										<ion-button color="danger" @click="hapusOrder(index)">Hapus</ion-button>
									</ion-col>
								</ion-row>
							</ion-grid>
						</ion-item>

					</ion-item-group>

					<ion-select v-if="objOrder.length > 0" @ionChange="handleChange($event)" label="Metode Pembayaran" placeholder="Pilih" value="Tunai">
						<ion-select-option value="Tunai">Tunai</ion-select-option>
						<ion-select-option value="Transfer">Transfer</ion-select-option>
					</ion-select>

					<div class="flex justify-between items-center py-4" v-if="objOrder.length">
						<button @click="setOpen(true)" data-modal-target="large-modal" data-modal-toggle="large-modal"
							class="block w-full md:w-auto text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							type="button">
							Konfirmasi OTP
						</button>
					</div>

					<ion-modal :is-open="isOpen">
						<ion-header>
							<ion-toolbar>
								<ion-title>OTP Whatsapp</ion-title>
								<ion-buttons slot="end">
									<ion-button @click="setOpen(false)">Close</ion-button>
								</ion-buttons>
							</ion-toolbar>
						</ion-header>
						<ion-content>
							<div v-if="flagOTP"
								class="relative flex min-h-screen flex-col justify-center overflow-hidden">
								<div
									class="relative bg-white px-6 mx-auto w-full max-w-lg rounded-2xl">
									<div class="mx-auto flex w-full max-w-md flex-col space-y-16">
										<div class="flex flex-col items-center justify-center text-center space-y-2">
											<img src="/public/3d-mobile-phone-with-security-code-padlock.jpg" alt="OTP Images">
											<div class="font-semibold text-3xl">
												<p>Kirim OTP Whatsapp</p>
											</div>
											<div class="flex flex-row text-sm font-medium text-gray-400">
												<p>Kami akan mengirimkan kode OTP ke nomor <br />{{ nomorWhatsappOTP }}</p>
											</div>
										</div>
										<div class="flex flex-col space-y-5">
											<div>
												<button @click="kirimOTP(nomorWhatsappOTP)"
													class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
													Kirim OTP
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div v-if="!flagOTP"
								class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
								<div
									class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
									<div class="mx-auto flex w-full max-w-md flex-col space-y-16">
										<div class="flex flex-col items-center justify-center text-center space-y-2">
											<div class="font-semibold text-3xl">
												<p>Verifikasi OTP Whatsapp</p>
											</div>
											<div class="flex flex-row text-sm font-medium text-gray-400">
												<p>Kami telah mengirim kode OTP ke nomor {{ nomorWhatsappOTP }}</p>
											</div>
										</div>

										<div>
											
												<div class="flex flex-col space-y-16">
													<div
														class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
														<div class="w-16 h-16 ">
															<input
																v-model="satu"
																class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
																type="text" name="" id="">
														</div>
														<div class="w-16 h-16 ">
															<input
																v-model="dua"
																class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
																type="text" name="" id="">
														</div>
														<div class="w-16 h-16 ">
															<input
																v-model="tiga"
																class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
																type="text" name="" id="">
														</div>
														<div class="w-16 h-16 ">
															<input
																v-model="empat"
																class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
																type="text" name="" id="">
														</div>
													</div>

													<div class="flex flex-col space-y-5">
														<div>
															<button
																@click="konfirmasiOTP"
																class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
																Verifikasi OTP
															</button>
														</div>

														<div
															class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
															<p>Tidak menerima kode OTP?</p> <a
																class="flex flex-row items-center text-blue-600"
																href="javascript:void(0)" @click="resendOTPHandler"
																rel="noopener noreferrer">Resend</a>
														</div>
													</div>
												</div>
										</div>
									</div>
								</div>
							</div>
						</ion-content>
					</ion-modal>
					<!-- <div class="relative overflow-x-auto shadow-lg shadow-gray-300 rounded-lg">
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
										<input id="orderInput" :value="order.qty" type="number" pattern="[0-9]"
											style="width: 8em" min="0" :max="order.stock" readonly />
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
					</div> -->
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
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { 
	objOrder, 
	nomorWhatsappOTP,
	satu,
	dua,
	tiga,
	empat, 
} from '@/services/globalVariables';

const route = useRoute();
const renderLoading = ref(null);

const isOpen = ref(false);

const setOpen = (open) => (isOpen.value = open, flagOTP.value = true);
const flagOTP = ref(true);
const storeData = ref(null);
const storeId = ref(route.params.id);
const productsData = ref([]);
const idToko = ref(null);
const metodePembayaran = ref("Tunai");
const resendOTP = ref(null);
const resendNomorPO = ref(null);

import { API_URL } from '@/services/globalVariables';
import router from '@/router';
import { loadingController, toastController } from '@ionic/vue';

async function konfirmasiOTP() {
	if (satu.value == null || dua.value == null || tiga.value == null || empat.value == null) 
	{
		alert("Kode OTP tidak boleh kosong");
		return false;
	}

	try {
	const URL = `${API_URL.value}/api/v2/stores/confirm-otp`;

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const config = {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    };
    
	await axios.post(URL, {
		"nomorPO": resendNomorPO.value ,
		"inputOtp": satu.value + dua.value + tiga.value + empat.value,
	}, config).then(async (res) => {
		console.log(res);
		

		catchToast(res.data.message, 3000);

		objOrder.value = [];

		// setOpen(false);
		isOpen.value = false;
    })
      .catch(function (error) {
        catchToastError("Kode OTP anda salah", 3000);
        stopLoading();
        console.error(error);
      });
  } catch (e) {
    alert("[" + e + "]");
  }
}

async function resendOTPHandler() {
	try {
	const URL = `${API_URL.value}/api/v2/stores/resend-otp`;

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const config = {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    };
    
	await axios.post(URL, {
		"nomorPO": resendNomorPO.value ,
	}, config).then(async (res) => {
		console.log(res);

		// res.data.resource;
		kirimWhatsapp(res.data.resource.nomor_po, res.data.resource.otp, nomorWhatsappOTP.value);
		
		resendNomorPO.value = res.data.resource.nomor_po;
		resendOTP.value = res.data.resource.otp;

		//catchToast("Kode OTP terkirim", 3000);
    })
      .catch(function (error) {
        alert("(" + error + ")");
        stopLoading();
        console.error(error);
      });
  } catch (e) {
    alert("[" + e + "]");
  }

}

function minusOrder(index, min) {
	objOrder.value[index].qty -= 1;

	if (objOrder.value[index].qty < min) {
		catchToastError("Tidak boleh order kurang dari 0", 3000);

		objOrder.value[index].qty = min;
	}
}

function handleChange(event) {
	metodePembayaran.value = event.detail.value;
}

async function kirimWhatsapp(nomorPO, otp, nomorWhatsappOTP) {
      const AuthStr = "Up#YVpLNfcEkqw3PCpBH";
      const URL = "https://api.fonnte.com/send";
      
	  let number = otp;

      let formData = new FormData();
      formData.append("target", nomorWhatsappOTP);
      formData.append(
        "message",
        `Kode OTP untuk nomor PO ${nomorPO} Anda adalah ${number}`
      );
      formData.append("countryCode", "62");

      const config = {
        headers: {
          Authorization: AuthStr,
        },
      };
      await axios
        .post(URL, formData, config)
        .then(async (res) => {
          	stopLoading();
			catchToast("OTP telah terkirim", 3000);
		})
        .catch(function (error) {
          alert("(" + error + ")");
          stopLoading();
          console.log(error);
        });
}

async function kirimOTP(nomorWhatsappOTP) {
	let a = false;

	Object.keys(objOrder.value).forEach(key => {
		const value = objOrder.value[key];

		if (value.qty == 0) {
			catchToastError("Kirim OTP gagal dikarenakan quantity order tidak boleh 0, mohon cek kembali", 3000)
			a = true;
			return false;
		}
	});

	if (a) return false;

	try {

	const URL = `${API_URL.value}/api/v2/stores/send-otp`;

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

	console.log(objOrder.value);

    // let formData = new FormData();
    // formData.append("nomorWhatsappOTP", nomorWhatsappOTP);
    // formData.append("objOrder", objOrder.value);
    // formData.append("idToko", idToko.value);

    const config = {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    };

    await axios.post(URL, {
		"nomorWhatsappOTP": nomorWhatsappOTP,
		"objOrder": objOrder.value,
		"idToko": idToko.value,
		"metodePembayaran": metodePembayaran.value,
	}, config).then(async (res) => {
		console.log(res);

		flagOTP.value = false;

		// res.data.resource;
		kirimWhatsapp(res.data.resource.nomor_po, res.data.resource.otp, nomorWhatsappOTP);
		
		resendNomorPO.value = res.data.resource.nomor_po;
		resendOTP.value = res.data.resource.otp;

		//catchToast("Kode OTP terkirim", 3000);
    })
      .catch(function (error) {
        alert("(" + error + ")");
        stopLoading();
        console.error(error);
      });
  } catch (e) {
    alert("[" + e + "]");
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
		router.push({ name: 'orderBarang', params: { id: storeId.value } });
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

		nomorWhatsappOTP.value = storeData.value.nomor_telepon_toko;
		
		idToko.value = storeData.value.store_id;

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

<style>
ion-col {
	background-color: rgb(244, 248, 255);
	border: solid 1px #fff;
	color: #fff;
	text-align: center;
}
</style>