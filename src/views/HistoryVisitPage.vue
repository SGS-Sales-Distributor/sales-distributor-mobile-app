<template>
    <ion-page>
        <HeaderSection />
        <ion-content :fullscreen="true">

            <div class="rekap-container">
                <ion-card color="">
                    <ion-card-content>
                        <div class="date-range-row">
                            <div class="date-range-field">
                                <label for="dari">Dari Tanggal :</label>
                                <ionInput type="date" v-model="dariTanggal" name="dariTanggal" id="dariTanggal"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-red-500">
                                </ionInput>
                            </div>
                            <div class="date-range-field">
                                <label for="sampai">Sampai Tanggal :</label>
                                <ionInput type="date" v-model="sampaiTanggal" name="sampaiTanggal" id="sampaiTanggal"
                                    class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-red-500">
                                </ionInput>
                            </div>
                        </div>
                        <br>
                        <button type="button"
                            class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            @click="getDataVisit"><ion-icon slot="start" :icon="checkmarkCircleSharp"></ion-icon>
                            Lihat</button>
                        <div class="summary-inline">
                            <div class="summary-row">
                                <span class="summary-label">Jumlah Visit</span>
                                <span class="summary-value">{{ totalVisitCount }}</span>
                            </div>
                            <p class="summary-note">{{ summaryDateLabel }}</p>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
            <div v-if="!storeInfoDistri || storeInfoDistri.length === 0" class="empty-state">
                <ion-card v-if="!isFiltered" class="empty-card">
                    <p>Silakan pilih tanggal terlebih dahulu</p>
                </ion-card>
                <ion-card v-else class="empty-card">
                    <p>Data tidak ditemukan</p>
                </ion-card>
            </div>
            <div v-for="(visit, index) in storeInfoDistri" :key="index + 1" class="relative overflow-x-auto" v-else>
                <ion-card class="py-2 odd:bg-blue-500 even:bg-sky-400 cursor-pointer !m-1 mb-2"  button
                    @click="openVisitDetail(visit)">
                    <ion-card-header class="bg-gray-50">
                        <div class="flex flex-row w-full items-start justify-between space-x-2">
                            <div class="flex flex-col space-y-2">
                                <div class="flex flex-row w-full justify-between space-x-2">
                                    <label class="flex-initial w-36 font-semibold">Kode Toko</label>
                                    <p class="flex-initial text-right">{{ visit.kode_toko || '-' }}</p>
                                </div>
                                <div class="flex flex-row w-full justify-between space-x-2">
                                    <label class="flex-initial w-36 font-semibold">Nama Toko</label>
                                    <p class="flex-initial text-right">{{ visit.nama_toko || '-' }}</p>
                                </div>
                                <div class="flex flex-row w-full justify-between space-x-2">
                                    <label class="flex-initial w-36 font-semibold">Tanggal Plan</label>
                                    <p class="flex-initial text-right">{{ formatVisitDate(visit.tanggal_plan) }}</p>
                                </div>
                            </div>
                            <ion-icon :icon="chevronForwardOutline" class="text-lg text-gray-500"></ion-icon>
                        </div>
                    </ion-card-header>
                </ion-card>
            </div>

            <ion-modal :is-open="showDetailModal" @didDismiss="closeVisitDetail">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Detail History Visit</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closeVisitDetail">Tutup</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding" v-if="selectedVisit">

                    <!-- FOTO DI ATAS -->
                    <div class="checkin-row mb-3">
                        <div class="photo-card">
                            <p class="photo-title">Foto Check-In 1</p>
                            <ion-img v-if="selectedVisitPhotoIn" :src="selectedVisitPhotoIn" />
                            <p v-else class="empty-text">Tidak tersedia</p>
                        </div>

                        <div class="photo-card">
                            <p class="photo-title">Foto Check-In Before</p>
                            <ion-img v-if="selectedVisitPhotoInSecond" :src="selectedVisitPhotoInSecond" />
                            <p v-else class="empty-text">Tidak tersedia</p>
                        </div>
                    </div>

                    <div class="checkin-row mb-4">
                        <div class="photo-card">
                            <p class="photo-title">Foto Check-Out 1</p>
                            <ion-img v-if="selectedVisitPhotoOut" :src="selectedVisitPhotoOut" />
                            <p v-else class="empty-text">Tidak tersedia</p>
                        </div>
                        <div class="photo-card">
                            <p class="photo-title">Foto Check-Out After</p>
                            <ion-img v-if="selectedVisitPhotoOutSecond" :src="selectedVisitPhotoOutSecond" />
                            <p v-else class="empty-text">Tidak tersedia</p>
                        </div>
                    </div>

                    <!-- DETAIL DI BAWAH -->
                    <div class="detail-card">
                        <div class="flex flex-col space-y-3">
                            <div class="flex justify-between">
                                <label>Kode Toko</label>
                                <p>{{ selectedVisit.kode_toko }}</p>
                            </div>
                            <div class="flex justify-between">
                                <label>Nama Toko</label>
                                <p>{{ selectedVisit.nama_toko }}</p>
                            </div>

                            <div class="flex justify-between">
                                <label>Tanggal Plan</label>
                                <p>{{ formatVisitDate(selectedVisit.tanggal_plan) }}</p>
                            </div>

                            <div class="flex justify-between">
                                <label>Tanggal Visit</label>
                                <p>{{ selectedVisit.tanggal_visit ? formatVisitDate(selectedVisit.tanggal_visit) : '-'
                                    }}</p>
                            </div>

                            <div class="flex justify-between">
                                <label>Check-In</label>
                                <p>{{ selectedVisit.waktu_masuk ? `${selectedVisit.waktu_masuk} WIB` : '-' }}</p>
                            </div>

                            <div class="flex justify-between">
                                <label>Check-Out</label>
                                <p>{{ selectedVisit.waktu_keluar ? `${selectedVisit.waktu_keluar} WIB` : '-' }}</p>
                            </div>

                            <div class="flex justify-between items-center">
                                <label>Status</label>
                                <ion-badge :color="getApprovalState(selectedVisit).color">
                                    {{ getApprovalState(selectedVisit).label }}
                                </ion-badge>
                            </div>

                            <div class="flex justify-between">
                                <label>Catatan In</label>
                                <p>{{ selectedVisit.keterangan }}</p>
                            </div>
                            <div class="flex justify-between">
                                <label>Catatan Out</label>
                                <p>{{ selectedVisit.keterangan_out }}</p>
                            </div>

                            <div v-if="selectedVisit.idNotVisit !== null" class="flex justify-between">
                                <label>Keterangan</label>
                                <p>{{ selectedVisit.ketNotVisit }}</p>
                            </div>
                        </div>
                    </div>

                </ion-content>
            </ion-modal>
            <!-- <ion-infinite-scroll @ionInfinite="ionInfinite">
                <ion-infinite-scroll-content loading-text="Load more history visit..."
                    loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll> -->
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
        </ion-content>
    </ion-page>
</template>
<script setup>
import { checkmarkCircleSharp, chevronForwardOutline } from 'ionicons/icons';
import { refreshAccessTokenHandler } from '@/services/auth';
import HeaderSection from '@/components/HeaderSection.vue';
import { IonInput, IonSearchbar } from '@ionic/vue';
import { onMounted, ref, computed } from 'vue';
import { catchToastError, catchToastWarn, catchToastInfo, catchToast } from '@/services/toastHandlers';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { useRoute } from 'vue-router';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import { IonDatetime, IonDatetimeButton, IonModal, IonRefresher, IonRefresherContent } from '@ionic/vue';

const route = useRoute();
const currentPageRouteName = computed(() => route.name);
const storeInfoDistri = ref([]);
const visitData = ref([]);
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
const firstDayOfMonth = `${y}-${m}-01`;
const todayDate = `${y}-${m}-${d}`;
const dariTanggal = ref(firstDayOfMonth);
const sampaiTanggal = ref(todayDate);

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

const showDetailModal = ref(false);
const selectedVisit = ref(null);
const selectedVisitPhotoIn = ref('');
const selectedVisitPhotoInSecond = ref('');
const selectedVisitPhotoOut = ref('');
const selectedVisitPhotoOutSecond = ref('');
const isFiltered = ref(false);
const totalVisitCount = computed(() => {
    if (!Array.isArray(storeInfoDistri.value)) {
        return 0;
    }

    return storeInfoDistri.value.filter((visit) => visit?.visit_id !== null).length;
});
const summaryDateLabel = computed(() => {
    if (!dariTanggal.value || !sampaiTanggal.value) {
        return 'Rentang tanggal belum dipilih';
    }

    return `${formatVisitDate(dariTanggal.value)} - ${formatVisitDate(sampaiTanggal.value)}`;
});

const formatVisitDate = (dateValue) => {
    if (!dateValue) {
        return '-';
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) {
        return String(dateValue);
    }

    return parsedDate.toLocaleDateString('id-ID', {
        day: '2-digit',
        weekday: 'long',
        month: 'long',
        year: 'numeric',
    });
};

const normalizeVisitImageUrl = (path) => {
    const imagePath = String(path || '').trim();

    if (!imagePath) {
        return '';
    }

    if (
        imagePath.startsWith('http://') ||
        imagePath.startsWith('https://') ||
        imagePath.startsWith('data:') ||
        imagePath.startsWith('blob:')
    ) {
        return imagePath;
    }

    if (!API_URL.value) {
        return imagePath;
    }

    if (imagePath.startsWith('/')) {
        return `${API_URL.value}${imagePath}`;
    }

    if (imagePath.includes('/')) {
        return `${API_URL.value}/${imagePath}`;
    }

    return `${API_URL.value}/images/${imagePath}`;
};

const getApprovalState = (visit) => {
    if (!visit) {
        return { color: 'medium', label: '-' };
    }

    if (visit.approval === 1) {
        return { color: 'success', label: 'Disetujui' };
    }

    if (
        formatedDate <= visit.tanggal_plan &&
        visit.waktu_masuk === null &&
        visit.waktu_keluar === null
    ) {
        return { color: 'warning', label: 'Belum Visit' };
    }

    if (
        (formatedDate > visit.tanggal_plan && visit.approval === 0) ||
        (formatedDate <= visit.tanggal_plan &&
            (visit.waktu_masuk !== null || visit.waktu_keluar !== null))
    ) {
        return { color: 'warning', label: 'Belum Disetujui' };
    }

    return { color: 'danger', label: 'Tidak Terpenuhi' };
};

const openVisitDetail = (visit) => {
    selectedVisit.value = visit;
    selectedVisitPhotoIn.value = normalizeVisitImageUrl(visit?.photo_visit);
    selectedVisitPhotoInSecond.value = normalizeVisitImageUrl(visit?.photo_visit_in_second);
    selectedVisitPhotoOut.value = normalizeVisitImageUrl(visit?.photo_visit_out);
    selectedVisitPhotoOutSecond.value = normalizeVisitImageUrl(visit?.photo_visit_out_second);
    showDetailModal.value = true;
};

const closeVisitDetail = () => {
    showDetailModal.value = false;
    selectedVisit.value = null;
    selectedVisitPhotoIn.value = '';
    selectedVisitPhotoInSecond.value = '';
    selectedVisitPhotoOut.value = '';
    selectedVisitPhotoOutSecond.value = '';
};

const handleRefresh = () => {
    window.location.reload();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
};

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
        catchToastWarn('Anda Belum Ada History Visit', 3000);
        // console.log(error.message);
        console.error('Failed to fetch Visit data: ', error);
    }
    finally {
        stopLoading();
    }
}

async function getDataVisit() {
    try {
        isFiltered.value = true;
        presentLoading();
        const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
        const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
        const mulai = dariTanggal.value;
        const sampai = sampaiTanggal.value;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };


        const response = await axios.get(`${API_URL.value}/api/sgs/profil_visit/user/${userId.user_id}/filter`, {
            headers: headers,
            "userId": userId.user_id,
            params: {
                dariTanggal: mulai,
                sampaiTanggal: sampai,

            },
        });

        storeInfoDistri.value = response.data.resource;
        catchToast("Berhasil", 3000);

    } catch (error) {
        if (error.response && error.response.data.status == 404 || error.response.data.status == 500) {
            catchToastWarn('Data Kosong', 3000);
        }
        console.log(error.message);
    }
    finally {
        stopLoading();
    }
}

onMounted(() => {
    getDataVisit();
})
</script>
<style scoped>
.rekap-container {
    margin-top: 28%;
    position: flex;
    flex-direction: column;
    padding: 0 12px;
    margin-bottom: 8px;
}

.date-range-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.date-range-field {
    display: flex;
    flex-direction: column;
}

.summary-inline {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.summary-label {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
}

.summary-value {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
}

.summary-note {
    margin-top: 6px;
    font-size: 12px;
    color: #6b7280;
}

@media (max-width: 640px) {
    .date-range-row {
        grid-template-columns: 1fr;
    }
}

.checkin-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.photo-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 8px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    text-align: center;
}

.photo-card ion-img {
    border-radius: 12px;
    margin-top: 8px;
    object-fit: contain;
    height: 190px;
    width: 100%;
    background: #f9fafb;
}

.photo-title {
    font-weight: 600;
    font-size: 13px;
}

.empty-state {
    margin-top: 20px;
    padding: 0 12px;
}

.empty-card {
    text-align: center;
    padding: 20px;
    font-weight: 500;
    font-size: 14px;
    color: #374151; /* lebih gelap */
    background: #f9fafb;
    border-radius: 12px;
}

.detail-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.detail-card label {
    font-weight: 600;
    color: #374151;
}

.detail-card p {
    color: #6b7280;
    text-align: right;
}

@media (max-width: 480px) {
    .checkin-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }

    .photo-card ion-img {
        height: 145px;
    }
}
</style>
