<!-- src/views/CabangRequestPage.vue -->
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button fill="clear" @click="$router.back()">
                        <ion-icon :icon="arrowBack" />
                    </ion-button>
                </ion-buttons>
                <ion-title>Request Cabang</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

            <!-- FORM REQUEST -->
            <div class="mb-6 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <h3 class="text-sm font-bold mb-3 text-gray-700">Tambah Area Coverage Baru</h3>

                <select v-model="selectedCabang"
                    class="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm bg-white mb-3">
                    <option disabled value="">-- Pilih Cabang --</option>
                    <option v-for="cabang in availableCabangs" :key="cabang.idCabang" :value="cabang">
                        {{ cabang.nama_cabang }}
                        {{ cabang.kode_lokasi ? `(${cabang.kode_lokasi})` : '' }}
                    </option>
                </select>

                <p v-if="availableCabangs.length === 0 && !isLoading" class="text-xs text-gray-400 mb-3">
                    Semua cabang sudah dimiliki atau sedang dalam proses request.
                </p>

                <ion-button expand="block" shape="round" :disabled="!selectedCabang || isSubmitting"
                    @click="submitRequest">
                    <ion-spinner v-if="isSubmitting" name="crescent" class="mr-2" />
                    <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Request' }}</span>
                </ion-button>
            </div>

            <!-- RIWAYAT REQUEST -->
            <div>
                <h3 class="text-sm font-bold mb-3 text-gray-700">Riwayat Request Cabang</h3>

                <div v-if="isLoading" class="text-center py-10">
                    <ion-spinner name="crescent" />
                </div>

                <div v-else-if="myRequests.length === 0" class="text-center text-gray-400 py-10 text-sm">
                    Belum ada riwayat request cabang.
                </div>

                <div v-for="req in myRequests" :key="req.id" class="mb-3 p-4 rounded-2xl border bg-white shadow-sm"
                    :class="{
                        'border-yellow-300': req.status === 'pending',
                        'border-green-300': req.status === 'approved',
                        'border-red-300': req.status === 'rejected',
                    }">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-sm">{{ req.nama_cabang }}</p>
                            <p class="text-xs text-gray-400">{{ req.kode_lokasi ?? '-' }}</p>
                            <p class="text-xs text-gray-400 mt-0.5">
                                {{ new Date(req.created_at).toLocaleDateString('id-ID', {
                                    day: '2-digit', month: 'long',
                                    year: 'numeric'
                                }) }}
                            </p>
                        </div>
                        <span class="text-xs font-bold px-3 py-1 rounded-full" :class="{
                            'bg-yellow-100 text-yellow-700': req.status === 'pending',
                            'bg-green-100  text-green-700': req.status === 'approved',
                            'bg-red-100    text-red-700': req.status === 'rejected',
                        }">
                            {{ statusLabel(req.status) }}
                        </span>
                    </div>
                    <p v-if="req.note" class="text-xs text-red-500 mt-2">
                        ⚠ {{ req.note }}
                    </p>
                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { arrowBack } from 'ionicons/icons';
import axios from 'axios';
import { API_URL } from '@/services/globalVariables';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';

const user     = localStorage.getItem('user')   ? JSON.parse(localStorage.getItem('user'))   : null;
const tokenSet = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
const authHeader = { Authorization: `Bearer ${tokenSet?.access_token}` };

const allCabangs = ref([]);
const myOwnedCabangIds = ref([]);
const myRequests = ref([]);
const selectedCabang = ref('');
const isSubmitting = ref(false);
const isLoading = ref(false);

const pendingCabangIds = computed(() =>
    myRequests.value
        .filter(r => r.status === 'pending')
        .map(r => r.cabang_id)
);

const availableCabangs = computed(() =>
    allCabangs.value.filter(c =>
        !myOwnedCabangIds.value.includes(c.idCabang) &&
        !pendingCabangIds.value.includes(c.idCabang)
    )
);

function statusLabel(status) {
    return { pending: 'Menunggu', approved: 'Disetujui', rejected: 'Ditolak' }[status] ?? status;
}

async function fetchAllCabangs() {
    const res = await axios.get(`${API_URL.value}/api/v2/area`);
    allCabangs.value = res.data.resource;
}

async function fetchMyOwnedCabangs() {
    const res = await axios.get(
        `${API_URL.value}/api/v2/user-cabang/my`,
        {
            headers: authHeader,
            params: { userId: user.user_id } 
        }
    );
    myOwnedCabangIds.value = res.data.resource.map(c => c.cabang_id);
}

async function fetchMyRequests() {
    const res = await axios.get(
        `${API_URL.value}/api/v2/cabang-request/my`,
        {
            headers: authHeader,
            params: { userId: user.user_id }
        }
    );
    myRequests.value = res.data.resource;
}

async function submitRequest() {
    if (!selectedCabang.value) return;
    isSubmitting.value = true;
    try {
        await axios.post(
            `${API_URL.value}/api/v2/cabang-request`,
            {
                cabang_id: selectedCabang.value.idCabang,
                kode_lokasi: selectedCabang.value.kode_lokasi,
                nama_cabang: selectedCabang.value.nama_cabang,
                userId: user.user_id,
                userFullname: user.fullname,
            },
            { headers: authHeader }
        );
        catchToast('Request berhasil dikirim! Menunggu approval AS.', 3000);
        selectedCabang.value = '';
        await fetchMyRequests(); // refresh list
    } catch (error) {
        catchToastError(error.response?.data?.message ?? 'Gagal mengirim request.', 3000);
    } finally {
        isSubmitting.value = false;
    }
}

onMounted(async () => {
    isLoading.value = true;
    presentLoading();
    await Promise.all([fetchAllCabangs(), fetchMyOwnedCabangs(), fetchMyRequests()]);
    stopLoading();
    isLoading.value = false;
});
</script>