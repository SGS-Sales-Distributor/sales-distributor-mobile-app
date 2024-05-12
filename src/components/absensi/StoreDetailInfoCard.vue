<template>
    <div v-if="statusGPS" class="flex flex-col space-y-2" id="store-detail-card">
        <ion-card v-if="detailStoreInfoDistri" class="shadow-lg shadow-gray-300">
            <ion-card-header>
                <div class="flex justify-between">
                    <ion-card-title>
                        <span class="font-bold text-gray-900 text-2xl">Data Detail Toko</span>
                    </ion-card-title>
                    <button id="close-btn" @click="closeButtonHandler"
                        class="text-gray-900 hover:text-gray-700 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                </div>
                <ion-card-subtitle>
                    <span class="font-medium text-gray-900">
                        Data dari toko <span class="font-bold">{{ detailStoreInfoDistri.nama_toko }}</span> secara
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
                                {{ detailStoreInfoDistri.nama_toko }}
                            </dd>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.visit_id }}
                            </dd>
                        </div>
                        <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-md font-bold text-gray-900">
                                Nama Alias Toko
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.alias_toko }}
                            </dd>
                        </div>
                        <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-md font-bold text-gray-900">
                                Alamat Toko
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.alamat_toko }}
                            </dd>
                        </div>
                        <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-md font-bold text-gray-900">
                                Nomor Telepon Toko
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.nomor_telepon_toko }}
                            </dd>
                        </div>
                        <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-md font-bold text-gray-900">
                                Nomor Fax Toko
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.nomor_fax_toko }}
                            </dd>
                        </div>
                        <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-md font-bold text-gray-900">
                                Kode Unik Toko
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.kode_toko }}
                            </dd>
                        </div>
                        <div class="bg-sky-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-md font-bold text-gray-900">
                                Nama Pemilik Toko
                            </dt>
                            <dd v-if="detailStoreInfoDistri.nama_pemilik_toko"
                                class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.nama_pemilik_toko }}
                            </dd>
                            <dd v-else class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ion-badge color="danger">Tidak Ada</ion-badge>
                            </dd>
                        </div>
                        <div class="bg-sky-100 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-md font-bold text-gray-900">
                                Email Pemilik Toko
                            </dt>
                            <dd v-if="detailStoreInfoDistri.email_pemilik_toko"
                                class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ detailStoreInfoDistri.email_pemilik_toko }}
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
</template>

<script setup>
import { refreshAccessTokenHandler } from '@/services/auth';
import { detailStoreInfoDistri, statusGPS } from '@/services/globalVariables';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { catchToastError } from '@/services/toastHandlers';

async function fetchOneStoreData(id) {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`
    };

    try {
        presentLoading();

        const response = await axios.get(`${API_URL}/api/v2/stores/${id}`, {
            headers: headers
        });

        detailStoreInfoDistri.value = response.data.resource;

        stopLoading();

        showDetailStoreCard();

        document.getElementById("check-in-button").focus();
    } catch (error) {
        catchToastError(error.message, 3000);

        console.error(`Failed to fetch store ${id}: `, error);
    } finally {
        stopLoading();
    }
}
</script>