<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<!-- Header -->
			<header class="bg-transparent p-4 rounded-b-3xl">
				<div class="flex justify-between">
					<div>
						<button v-if="currentRoute === 'purchaseOrder'" type="button"
							class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
							@click="redirectToPurchaseOrderPage">
							<ion-icon class="text-2xl" :icon="chevronBackOutline" color="dark"></ion-icon>
						</button>

						<button v-else type="button"
							class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
							@click="redirectToAbsensiPage">
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
							<button>
								<ion-icon class="text-2xl" :icon="ellipsisVerticalOutline" color="dark"></ion-icon>
							</button>
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
					<div class="flex flex-col space-y-2 mb-4" id="store-detail-card">
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
									<dl v-if="currentRoute === 'purchaseOrder'">
										<div class="bg-lime-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nama Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nama_toko }}
											</dd>
										</div>
										<div class="bg-lime-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nama Alias Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.alias_toko }}
											</dd>
										</div>
										<div class="bg-lime-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Alamat Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.alamat_toko }}
											</dd>
										</div>
										<div class="bg-lime-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nomor Telepon Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nomor_telepon_toko }}
											</dd>
										</div>
										<div class="bg-lime-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nomor Fax Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nomor_fax_toko }}
											</dd>
										</div>
										<div class="bg-lime-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Kode Unik Toko
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.kode_toko }}
											</dd>
										</div>
										<div class="bg-lime-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Nama Pemilik Toko
											</dt>
											<dd v-if="storeData.nama_pemilik"
												class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nama_pemilik }}
											</dd>
											<dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												<ion-badge color="danger">Tidak Ada</ion-badge>
											</dd>
										</div>
										<div class="bg-lime-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
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

									<dl v-else>
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
											<dd v-if="storeData.nama_pemilik"
												class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.nama_pemilik }}
											</dd>
											<dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												<ion-badge color="danger">Tidak Ada</ion-badge>
											</dd>
										</div>
										<div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
											<dt class="text-md font-bold text-gray-900">
												Email Pemilik Toko
											</dt>
											<dd v-if="storeData.email_pemilik"
												class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
												{{ storeData.email_pemilik }}
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

					<h6 v-if="objOrder.length > 0" class="text-center font-bold py-4">Daftar Promo</h6>

					<div class="relative overflow-x-auto mb-4">
						<ion-card v-if="currentRoute === 'purchaseOrder'" class="py-2 bg-lime-500">
							<ion-card-header class="bg-gray-50">
								<h6 class="font-bold text-left p-2.5">Daftar Program Terkini</h6>
								<ion-list>
									<ion-item v-for="(program, index) in visiblePromoPrograms" :key="index + 1">
										<ion-label>{{ program.name_program }}</ion-label>
									</ion-item>
								</ion-list>
								<ion-infinite-scroll @ionInfinite="ionInfinite">
									<ion-infinite-scroll-content loading-text="Load more programs..."
										loading-spinner="bubbles"></ion-infinite-scroll-content>
								</ion-infinite-scroll>
							</ion-card-header>
						</ion-card>

						<ion-card v-else class="py-2 bg-blue-500">
							<ion-card-header class="bg-gray-50">
								<h6 class="font-bold text-left p-2.5">Daftar Program Terkini</h6>
								<ion-list>
									<ion-item v-for="(program, index) in visiblePromoPrograms" :key="index + 1">
										<ion-label>{{ program.name_program }}</ion-label>
									</ion-item>
								</ion-list>
								<ion-infinite-scroll @ionInfinite="ionInfinite">
									<ion-infinite-scroll-content loading-text="Load more programs..."
										loading-spinner="bubbles"></ion-infinite-scroll-content>
								</ion-infinite-scroll>
							</ion-card-header>
						</ion-card>
					</div>

					<div class="flex justify-center items-center mb-2">
						<button v-if="currentRoute === 'purchaseOrder'"
							@click="redirectToStorePurchaseOrderPage(storeId)" data-modal-target="large-modal"
							data-modal-toggle="large-modal"
							class="block w-full md:w-auto text-gray-900 bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
							type="button">
							Tambah Order
						</button>
						<button v-else @click="redirectToStorePurchaseOrderPage(storeId)"
							data-modal-target="large-modal" data-modal-toggle="large-modal"
							class="block w-full md:w-auto text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
							type="button">
							Tambah Order
						</button>
					</div>

					<h6 v-if="objOrder.length > 0" class="text-center font-bold py-4">Daftar Order</h6>

					<div v-for="(order, index) in objOrder" :key="index + 1" class="relative overflow-x-auto">
						<ion-card v-if="currentRoute === 'purchaseOrder'" class="py-2 bg-lime-400">
							<ion-card-header class="bg-gray-50">
								<div class="flex flex-col w-full h-full space-y-2">
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-toko" class="flex-initial w-56 font-semibold">Kode
											Produk</label>
										<p class="flex-initial w-44 text-right">{{ order.prodNumber }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-toko" class="flex-initial w-56 font-semibold">Nama
											Produk</label>
										<p class="flex-initial w-44 text-right">{{ order.prodName }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-toko" class="flex-initial w-56 font-semibold">Stok</label>
										<p class="flex-initial w-44 text-right">{{ order.stock }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-toko" class="flex-initial w-56 font-semibold">Harga
											Produk</label>
										<p class="flex-initial w-44 text-right">{{ new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR'
										}).format(order.prodPrice) }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-toko" class="flex-initial w-56 font-semibold">Quantity</label>
										<div class="flex">
											<ion-button size="small" @click="reduceOrder(index, 0)" color="success">
												<ion-icon slot="icon-only" :icon="removeOutline"></ion-icon>
											</ion-button>
											<input id="orderInput" :value="order.qty" type="number" pattern="[0-9]"
												min="0" :max="order.stock" readonly class="text-right" />
											<ion-button size="small" @click="addMoreOrder(index, order.stock)"
												color="success">
												<ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
											</ion-button>
										</div>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-toko" class="flex-initial w-56 font-semibold">Total
											Harga</label>
										<p class="flex-initial w-44 text-right">{{ new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR'
										}).format((calculateTotalPriceHandler(order.prodPrice,
											order.qty)).toFixed(3)) }}</p>
									</div>
								</div>
							</ion-card-header>
							<ion-card-content class="bg-gray-50">
								<div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
									<ion-button color="danger"
										@click="deleteRecentOrder(index, order.prodNumber)">Hapus</ion-button>
								</div>
							</ion-card-content>
						</ion-card>

						<ion-card v-else class="py-2 bg-blue-500">
							<ion-card-header class="bg-gray-50">
								<div class="flex flex-col w-full h-full space-y-2">
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-toko" class="flex-initial w-56 font-semibold">Kode
											Produk</label>
										<p class="flex-initial w-44 text-right">{{ order.prodNumber }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="nama-produk" class="flex-initial w-56 font-semibold">Nama
											Produk</label>
										<p class="flex-initial w-44 text-right">{{ order.prodName }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="stok" class="flex-initial w-56 font-semibold">Stok</label>
										<p class="flex-initial w-44 text-right">{{ order.stock }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="harga-produk" class="flex-initial w-56 font-semibold">Harga
											Produk</label>
										<p class="flex-initial w-44 text-right">{{ new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR'
										}).format(order.prodPrice) }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="qty" class="flex-initial w-56 font-semibold">Quantity</label>
										<div class="flex">
											<ion-button size="small" @click="reduceOrder(index, 0)">
												<ion-icon slot="icon-only" :icon="removeOutline"></ion-icon>
											</ion-button>
											<input id="orderInput" :value="order.qty" type="number" pattern="[0-9]"
												min="0" :max="order.stock" readonly class="text-right" />
											<ion-button size="small" @click="addMoreOrder(index, order.stock)">
												<ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
											</ion-button>
										</div>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="total-harga" class="flex-initial w-56 font-semibold">Total
											Harga</label>
										<p class="flex-initial w-44 text-right">{{ new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR'
										}).format((calculateTotalPriceHandler(order.prodPrice,
											order.qty)).toFixed(3)) }}</p>
									</div>
									<div class="flex flex-row w-full h-full justify-between space-x-2">
										<label for="promo" class="flex-initial w-56 font-semibold">Dapat Promo</label>
										<!-- <p v-for="(promo, index) in relatedPromosOfSelectedProduct" :key="index+1" class="flex-initial w-44 text-right">{{ promo }}</p> -->
									</div>
								</div>
							</ion-card-header>
							<ion-card-content class="bg-gray-50">
								<div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
									<ion-button color="danger" id="reset-order-btn"
										@click="deleteRecentOrder(index, order.prodNumber)">Hapus</ion-button>
									<!-- <ion-button color="success" v-if="order.qty > 0"
										@click="totalProductsPrice(order.prodPrice, order.qty)">Konfirmasi</ion-button> -->
								</div>
							</ion-card-content>
						</ion-card>
					</div>

					<ion-select v-if="objOrder.length > 0" @ionChange="handleChange($event)" label="Metode Pembayaran"
						placeholder="Pilih" :value="metodePembayaran">
						<ion-select-option value="Tunai">Tunai</ion-select-option>
						<ion-select-option value="Transfer">Transfer</ion-select-option>
					</ion-select>

					<!-- <div class="flex justify-between items-center py-2" v-if="objOrder.length">
						<button @click="checkProductsHasPromo"
							class="block w-full md:w-auto text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							type="button">
							Cek Promo
						</button>
					</div> -->

					<div class="flex justify-between items-center py-2" v-if="objOrder.length">
						<button @click="setOpen(true)"
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
								<div class="relative bg-white px-6 mx-auto w-full max-w-lg rounded-2xl">
									<div class="mx-auto flex w-full max-w-md flex-col space-y-16">
										<div class="flex flex-col items-center justify-center text-center space-y-2">
											<img src="/public/3d-mobile-phone-with-security-code-padlock.jpg"
												alt="OTP Images">
											<div class="font-semibold text-3xl">
												<p>Kirim OTP Whatsapp</p>
											</div>
											<div class="flex flex-row text-sm font-medium text-gray-400">
												<p>Kami akan mengirimkan kode OTP ke nomor <br />{{ nomorWhatsappOTP }}
												</p>
											</div>
										</div>
										<div class="flex flex-col space-y-5">
											<div>
												<button @click="sendOTP(nomorWhatsappOTP)"
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
								<div class="relative bg-white px-6 py-8 mx-auto w-full max-w-lg rounded-2xl">
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
														<input v-model="firstOTPNumber"
															class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
															type="text" name="" id="" maxlength="1">
													</div>
													<div class="w-16 h-16 ">
														<input v-model="secondOTPNumber"
															class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
															type="text" name="" id="" maxlength="1">
													</div>
													<div class="w-16 h-16 ">
														<input v-model="thirdOTPNumber"
															class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
															type="text" name="" id="" maxlength="1">
													</div>
													<div class="w-16 h-16 ">
														<input v-model="fourthOTPNumber"
															class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
															type="text" name="" id="" maxlength="1">
													</div>
												</div>

												<div class="flex flex-col space-y-5">
													<div>
														<button @click="confirmOTP"
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
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { refreshAccessTokenHandler } from '@/services/auth.js';
import { catchToast, catchToastError, catchToastInfo } from '@/services/toastHandlers';
import {
	objOrder,
	nomorWhatsappOTP,
	firstOTPNumber,
	secondOTPNumber,
	thirdOTPNumber,
	fourthOTPNumber,
	selectedProduct,
	currentRoute,
} from '@/services/globalVariables';
import { redirectToStorePurchaseOrderPage, redirectToAbsensiPage, redirectToPurchaseOrderPage } from '@/services/redirectHandlers';
import { API_URL } from '@/services/globalVariables';
import { IonSelectOption, IonSelect } from '@ionic/vue';

const route = useRoute();

const isOpen = ref(false);
const setOpen = (open) => (isOpen.value = open, flagOTP.value = true);

const flagOTP = ref(true);
const storeData = ref(null);
const storeId = ref(route.params.id);

const brandsData = ref([]);
const productsData = ref([]);
const promoProgramsData = ref([]);

// const hasProductGetPromo = ref(false);
// const relatedPromosOfSelectedProduct = ref([]);

const lastIndex = ref(5);
const visiblePromoPrograms = computed(() => {
	return promoProgramsData.value && promoProgramsData.value.length > 0
		? promoProgramsData.value.slice(0, lastIndex.value)
		: [];
});
const reachedEnd = computed(() => {
	return Array.isArray(promoProgramsData.value) && lastIndex.value >= promoProgramsData.value.length;
});

// need to add check promo later!!!
const calculateTotalPriceHandler = (prodPrice, qty) => {
	const total = parseFloat(prodPrice) * qty;
	return total;
}

// const totalProductsPrice = (prodPrice, qty) => {
// 	productsTotalPrice.value.push(calculateTotalPriceHandler(prodPrice, qty));

// 	console.log(productsTotalPrice.value);
// }

// const sumTotalProductsPrice = () => {
// 	let total = 0;

// 	productsTotalPrice.value.forEach(price => {
// 		total += price;
// 	});

// 	return total;
// }

const idToko = ref(null);
const metodePembayaran = ref("Tunai");
const resendOTP = ref(null);
const resendNomorPO = ref(null);

function handleChange(event) {
	metodePembayaran.value = event.detail.value;
}

function checkProductsHasPromo() {
	const productMap = new Map();

	objOrder.value.forEach(product => {
		productMap.set(product.prodNumber, product);
	});

	promoProgramsData.value.forEach(promo => {
		const eligibleProducts = promo.details.map(detail => {
			const product = productMap.get(detail.product);

			return product && product.qty >= detail.condition ? product : null;
		}).filter(Boolean);

		if (eligibleProducts.length > 0) {
			const productWithLowestPrice = eligibleProducts.reduce((lowest, product) => {
				return product.prod_base_price < lowest.prod_base_price ? product : lowest;
			});

			catchToastInfo(`${productWithLowestPrice.prodNumber} mendapatkan promo ${promo.name_program}`, 3000);
		}
	});
}

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

async function confirmOTP() {
	if (firstOTPNumber.value == null || secondOTPNumber.value == null || thirdOTPNumber.value == null || fourthOTPNumber.value == null) {
		alert("Kode OTP tidak boleh kosong");
		return false;
	}

	try {
		refreshAccessTokenHandler();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

		const headers = {
			'Authorization': `Bearer ${tokens.access_token}`,
		}

		const response = await axios.post(`${API_URL.value}/api/v2/stores/confirm-otp`, {
			"nomorPO": resendNomorPO.value,
			"inputOtp": firstOTPNumber.value + secondOTPNumber.value + thirdOTPNumber.value + fourthOTPNumber.value,
		}, {
			headers: headers
		});

		catchToast(response.data.message, 3000);

		objOrder.value = [];

		isOpen.value = false;
		
		redirectToAbsensiPage();

	} catch (error) {
		catchToastError("Kode OTP salah", 3000);

		console.error("Kode OTP salah", error);
	}
}

async function resendOTPHandler() {
	try {
		refreshAccessTokenHandler();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

		const headers = {
			'Authorization': `Bearer ${tokens.access_token}`,
		}

		const response = await axios.post(`${API_URL.value}/api/v2/stores/resend-otp`, {
			"nomorPO": resendNomorPO.value,
		}, {
			headers: headers
		});

		sendOTPIntoWhatsapp(
			response.data.resource.nomor_po,
			response.data.resource.otp,
			nomorWhatsappOTP.value
		);

		resendNomorPO.value = response.data.resource.nomor_po;
		resendOTP.value = response.data.resource.otp;

	} catch (error) {
		catchToastError("Gagal mengirim ulang kode OTP", 3000);

		console.error("Gagal mengirim ulang kode OTP", error);
	}
}

async function sendOTPIntoWhatsapp(nomorPO, otp, nomorWhatsappOTP) {
	const fonteUniqueToken = "Up#YVpLNfcEkqw3PCpBH";
	// const fonteUniqueToken = "!GQUJzvQaWe#QqxpC#@1";

	try {
		refreshAccessTokenHandler();

		let formData = new FormData();
		formData.append("target", nomorWhatsappOTP);
		formData.append("message", `Kode OTP untuk nomor PO ${nomorPO} Anda adalah ${otp}`);
		formData.append("countryCode", "62");

		const headers = {
			'Authorization': fonteUniqueToken,
		}

		await axios.post("https://api.fonnte.com/send", formData, {
			headers: headers,
		});

		catchToast("OTP berhasil terkirim", 3000);
	} catch (error) {
		catchToastError("OTP gagal terkirim", 3000);

		console.error("OTP gagal terkirim", error);
	}
}

async function sendOTP(nomorWhatsappOTP) {
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
		refreshAccessTokenHandler();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
		const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

		const headers = {
			'Authorization': `Bearer ${tokens.access_token}`,
		}

		const response = await axios.post(`${API_URL.value}/api/v2/stores/send-otp`, {
			"nomorWhatsappOTP": nomorWhatsappOTP,
			"objOrder": objOrder.value,
			"idToko": idToko.value,
			"metodePembayaran": metodePembayaran.value,
			"userNumber" : user.number,
		}, {
			headers: headers
		});

		flagOTP.value = false;

		sendOTPIntoWhatsapp(
			response.data.resource.nomor_po,
			response.data.resource.otp,
			nomorWhatsappOTP,
		);

		resendNomorPO.value = response.data.resource.nomor_po;
		resendOTP.value = response.data.resource.otp;
	} catch (error) {
		catchToastError("Gagal mengirim OTP", 3000);

		console.error("Gagal mengirim OTP", error);
	}
}

function addMoreOrder(index, maks) {
	if (objOrder.value[index].qty < maks) {
		objOrder.value[index].qty++;

		checkProductsHasPromo();
	}

	if (objOrder.value[index].qty > maks) {
		catchToastError(`Tidak boleh order melebihi dari ${maks}`, 3000);

		objOrder.value[index].qty = maks;
	}
}

function reduceOrder(index, min) {
	if (objOrder.value[index].qty > min) {
		objOrder.value[index].qty--;

		checkProductsHasPromo();
	}

	if (objOrder.value[index].qty < min) {
		catchToastError("Tidak boleh order kurang dari 0", 3000);

		objOrder.value[index].qty = min;
	}
}

function deleteRecentOrder(index, prodNumber) {
	objOrder.value.splice(index, 1);

	if (selectedProduct.value.includes(prodNumber)) {
		const productIndex = selectedProduct.value.indexOf(prodNumber);

		// productsTotalPrice.value.splice(productIndex, 1);

		selectedProduct.value.splice(productIndex, 1);
	}

	// console.log(productsTotalPrice.value);
}

async function fetchPromoProgram() {
	try {
		refreshAccessTokenHandler();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokens.access_token}`
		};

		const response = await axios.get(`${API_URL.value}/api/v2/programs`, {
			headers: headers,
		});

		promoProgramsData.value = response.data.resource.data;
	} catch (error) {
		catchToastError("Failed to fetch program promo data", 3000);

		console.error("Failed to fetch program promo data", error);
	}
}

async function fetchBrandsData(query = '') {
	try {
		refreshAccessTokenHandler();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokens.access_token}`
		};

		const response = await axios.get(`${API_URL.value}/api/v2/brands`, {
			headers: headers,
			params: {
				q: query,
			},
		});

		brandsData.value = response.data.resource.data;
	} catch (error) {
		catchToastError("Failed to fetch brand data", 3000);

		console.error("Failed to fetch brand data", error);
	}
}

async function fetchStoreDetailData(id) {
	try {
		refreshAccessTokenHandler();

		const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
		const setuser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null ;

		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${tokens.access_token}`
		};

		const response = await axios.get(`${API_URL.value}/api/v2/stores/${id}`, {
			headers: headers,
			params : {
				'userId' : setuser.user_id,
			}
		});

		console.log(response.data);

		storeData.value = response.data.resource;

		nomorWhatsappOTP.value = storeData.value.nomor_telepon_toko;

		idToko.value = storeData.value.store_id;

		localStorage.setItem("store_id", storeData.value.store_id);
		// catchToastInfo(response.data,3000);
	} catch (error) {
		if (error.response && error.response.data.status == 401) {
			catchToastError(error.response.data.message, 3000);
		} 
		// else if (error.response.data.status == 500) {
		// 	catchToastError(error.response.data.message, 3000);
		// } 
		else {
			// catchToastError('Terjadi Kesalahan Server! Silahkan Coba Beberapa Saat Lagi', 3000);
			// catchToastError(`Failed to fetch store ${id}`, 3000);
			console.log(error, 3000);
		}
		// console.error(`Failed to fetch store ${id}: `, error);
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
	} catch (error) {
		catchToastError("Failed to fetch products data", 3000);

		console.error("Failed to fetch products data: ", error);
	}
}

onMounted(() => {
	refreshAccessTokenHandler();
	fetchStoreDetailData(storeId.value);
	fetchPromoProgram();
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