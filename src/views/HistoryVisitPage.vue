<template>
    <ion-page>
        <ion-content>
            <HeaderSection />
            <div>
                <!-- <ion-card-subtitle class="text-md text-gray-900 font-bold pb-2 text-center">History Visit Anda : </ion-card-subtitle> -->
            </div>
            <div v-for="(visit, index) in storeInfoDistri" :key="index + 1" class="relative overflow-x-auto">
                <ion-card class="py-2 odd:bg-blue-500 even:bg-sky-400">
                    <ion-card-header class="bg-gray-50">
                        <div class="flex flex-col w-full h-full space-y-2">
                            <div class="flex flex-row w-full h-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Nama Toko</label>
                                <p class="flex-initial w-44 text-right">{{ visit.nama_toko }}</p>
                            </div>
                            <div class="flex flex-row w-full h-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Tanggal Plan</label>
                                <p class="flex-initial w-44 text-right">{{ new
                                    Date(visit.tanggal_plan).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        weekday: 'long',
                                        month: 'long',
                                        year: 'numeric'
                                    }) }}</p>
                            </div>
                            <div v-if="visit.tanggal_visit" class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Tanggal Visit</label>
                                <p class="flex-initial w-44 text-right">{{ new
                                    Date(visit.tanggal_visit).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        weekday: 'long',
                                        month: 'long',
                                        year: 'numeric'
                                    }) }}</p>
                            </div>
                            <div v-else class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial font-semibold">Tanggal Visit</label>
                                <ion-badge v-if="formatedDate > visit.tanggal_plan" color="danger">Tidak
                                    Terpenuhi</ion-badge>
                                <ion-badge v-else color="warning">Belum Visit</ion-badge>
                            </div>
                            <div v-if="visit.waktu_masuk !== null"
                                class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Waktu Check-In</label>
                                <p class="flex-initial w-44 text-right">{{ visit.waktu_masuk }} WIB</p>
                            </div>
                            <div v-else class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial font-semibold">Waktu Check-In</label>
                                <ion-badge v-if="formatedDate > visit.tanggal_plan" color="danger">Tidak
                                    Terpenuhi</ion-badge>
                                <ion-badge v-else color="warning">Belum Visit</ion-badge>
                            </div>
                            <div v-if="visit.waktu_keluar" class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Waktu Check-Out</label>
                                <p class="flex-initial w-44 text-right">{{ visit.waktu_keluar }} WIB</p>
                            </div>
                            <div v-else class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial font-semibold">Waktu Check-Out</label>
                                <ion-badge v-if="formatedDate > visit.tanggal_plan" color="danger">Tidak
                                    Terpenuhi</ion-badge>
                                <ion-badge v-else color="warning">Belum Visit</ion-badge>
                            </div>
                            <div class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Catatan Visit</label>
                                <ion-badge v-if="formatedDate > visit.tanggal_plan && visit.keterangan === null"
                                    color="danger">Tidak
                                    Terpenuhi</ion-badge>
                                <p v-else-if="visit.keterangan !== null" class="flex-initial w-44 text-right">{{
                                    visit.keterangan }}</p>
                                <ion-badge v-else color="warning">Belum Visit</ion-badge>
                            </div>
                            <div class="flex flex-row w-full justify-between space-x-2">
                                <label for="nama-toko" class="flex-initial w-56 font-semibold">Status Approval</label>
                                <div v-if="visit.approval === 1" class="flex justify-center items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                                    <ion-badge color="success">Disetujui</ion-badge>
                                </div>
                                <div v-else class="flex justify-center items-center">
                                    <ion-badge v-if="formatedDate > visit.tanggal_plan" color="danger">Tidak
                                        Terpenuhi</ion-badge>
                                    <ion-badge v-else color="warning">{{ visit.waktu_masuk !== null &&
                                        visit.waktu_keluar
                                        !== null ? 'Menunggu Disetujui' : 'Belum Disetujui' }}</ion-badge>
                                </div>
                            </div>
                        </div>
                    </ion-card-header>
                </ion-card>
            </div>
            <ion-infinite-scroll @ionInfinite="ionInfinite">
                <ion-infinite-scroll-content loading-text="Load more history visit..."
                    loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>
<script setup>
import { refreshAccessTokenHandler } from '@/services/auth';
import HeaderSection from '@/components/HeaderSection.vue';
import { IonSearchbar } from '@ionic/vue';
import { onMounted, ref, computed } from 'vue';
import { catchToastError } from '@/services/toastHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { useRoute } from 'vue-router';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const route = useRoute();
const currentPageRouteName = computed(() => route.name);
const storeInfoDistri = ref([]);
const lastIndex = ref(5);
const visiter = computed(() => {
    return storeInfoDistri.value && storeInfoDistri.value.length > 0
        ? storeInfoDistri.value.slice(0, lastIndex.value)
        : [];
});
const today = new Date();
const m = String(today.getMonth() + 1).padStart(2, '0');
const d = String(today.getDate()).padStart(2, '0');
const y = String(today.getFullYear());

const formatedDate = [y, m, d].join('-');

const reachedEnd = computed(() => {
    return Array.isArray(storeInfoDistri.value) && lastIndex.value >= storeInfoDistri.value.length;
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

async function fetchStoresData() {

    try {
        presentLoading();
        refreshAccessTokenHandler();

        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
        const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        const response = await axios.get(`${API_URL.value}/api/sgs/profil_visit/user/${userId.user_id}`, {
            headers: headers,
            params: {
            },
        });

        storeInfoDistri.value = response.data.resource;

    } catch (error) {
        // catchToastError('Failed to fetch store data', 3000);
        catchToastError('Anda Belum Ada History Visit 1', 3000);
        // console.log(error.message);
        console.error('Failed to fetch Visit data: ', error);
    }
    finally {
        stopLoading();
    }
}

// function searchStoreHandler(event) {
//     const query = event.target.value.toLowerCase();

//     fetchStoresData(query);
// }

onMounted(() => {
    fetchStoresData();
    // searchStoreHandler();

})
</script>