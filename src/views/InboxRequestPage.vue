<template>
  <ion-page>
    <HeaderSection />
    <ion-content :fullscreen="true">
      <div class="container px-4">

        <h2 class="text-2xl font-bold text-center mb-2 mt-4">📬 Inbox Request</h2>
        <p class="text-gray-400 text-center text-sm mb-4">Request outlet & cabang</p>

        <!-- ===== TAB SWITCHER ===== -->
        <div class="flex mb-4 rounded-xl overflow-hidden border border-gray-200">
          <button class="flex-1 py-2 text-sm font-semibold transition-all"
            :class="activeTab === 'outlet' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'"
            @click="activeTab = 'outlet'">
            Outlet Request
            <span v-if="pendingCount > 0"
              :class="activeTab === 'outlet' ? 'bg-white text-blue-600' : 'bg-red-500 text-white'"
              class="ml-1 text-xs rounded-full px-1.5 font-bold">
              {{ pendingCount }}
            </span>
          </button>
          <button class="flex-1 py-2 text-sm font-semibold transition-all"
            :class="activeTab === 'cabang' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'"
            @click="activeTab = 'cabang'">
            Cabang Request
            <span v-if="pendingCabangCount > 0"
              :class="activeTab === 'cabang' ? 'bg-white text-blue-600' : 'bg-red-500 text-white'"
              class="ml-1 text-xs rounded-full px-1.5 font-bold">
              {{ pendingCabangCount }}
            </span>
          </button>
        </div>

        <!-- ===== TAB: OUTLET REQUEST ===== -->
        <div v-if="activeTab === 'outlet'">

          <!-- Filter status -->
          <div class="flex justify-center gap-2 mb-4 flex-wrap">
            <button v-for="s in statuses" :key="s.value" @click="filterStatus = s.value" :class="filterStatus === s.value
              ? 'bg-blue-500 text-white shadow-md border-blue-500'
              : 'bg-white text-gray-400 border-gray-300 hover:border-blue-300 hover:text-blue-400'"
              class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all border-2">
              {{ s.label }}
              <span v-if="s.value === 'pending' && pendingCount > 0"
                :class="filterStatus === s.value ? 'bg-white text-blue-500' : 'bg-red-500 text-white'"
                class="ml-1 text-xs rounded-full px-1.5 font-bold">
                {{ pendingCount }}
              </span>
            </button>
          </div>

          <!-- Empty state outlet -->
          <div v-if="filteredRequests.length === 0"
            class="flex flex-col items-center justify-center mt-20 text-gray-400">
            <ion-icon :icon="mailOpenOutline" class="text-6xl mb-3"></ion-icon>
            <p class="text-lg font-semibold">Tidak ada request</p>
            <p class="text-sm">Belum ada request outlet masuk</p>
          </div>

          <!-- List outlet request -->
          <div v-for="req in filteredRequests" :key="req.id"
            class="bg-white rounded-2xl shadow-md mb-4 overflow-hidden border border-gray-100">

            <!-- Header card -->
            <div :class="headerColor(req.status)" class="px-4 py-3 flex justify-between items-center">
              <div>
                <span><span class="font-bold text-white text-base">Nama Toko:</span> {{ req.store_name }}</span>
                <p></p>
                <span><span class="font-bold text-white text-base">Alamat:</span> {{ req.store_address }}</span>
              </div>
              <span class="bg-white bg-opacity-30 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
                {{ req.status }}
              </span>
            </div>

            <!-- Body card -->
            <div class="px-4 py-3 space-y-1.5">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ion-icon :icon="personOutline" class="text-blue-400"></ion-icon>
                <span><span class="font-semibold">Owner:</span> {{ req.owner }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ion-icon :icon="callOutline" class="text-green-400"></ion-icon>
                <span><span class="font-semibold">No HP:</span> {{ req.store_phone ?? '-' }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ion-icon :icon="businessOutline" class="text-purple-400"></ion-icon>
                <span><span class="font-semibold">Cabang:</span> {{ req.cabang?.nama_cabang ?? '-' }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ion-icon :icon="peopleOutline" class="text-orange-400"></ion-icon>
                <span><span class="font-semibold">Diajukan oleh:</span> {{ req.requested_by_name }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <ion-icon :icon="timeOutline" class="text-gray-400"></ion-icon>
                <span>{{ formatDate(req.created_at) }}</span>
              </div>
              <div v-if="req.status === 'registered'"
                class="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2 text-green-600 text-sm font-semibold">
                <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                Disetujui oleh {{ req.approved_by_name }}
              </div>
              <div v-if="req.status === 'rejected'"
                class="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2 text-red-500 text-sm font-semibold">
                <ion-icon :icon="closeCircleOutline"></ion-icon>
                Ditolak oleh {{ req.rejected_by_name }}
              </div>
              <div v-if="req.notes"
                class="mt-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-600">
                <span class="font-semibold">📝 Catatan:</span> {{ req.notes }}
              </div>

              <!-- Action buttons outlet -->
              <div v-if="req.status === 'pending'" class="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                <ion-button expand="block" color="success" size="small" class="flex-1 font-semibold"
                  @click="approveRequest(req.id)">
                  <ion-icon slot="start" :icon="checkmarkCircleOutline"></ion-icon>
                  Approve
                </ion-button>
                <ion-button expand="block" color="danger" size="small" class="flex-1 font-semibold"
                  @click="openRejectOutletModal(req)">
                  <ion-icon slot="start" :icon="closeCircleOutline"></ion-icon>
                  Reject
                </ion-button>
              </div>
              <div v-if="req.status === 'registered'"
                class="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2 text-green-600 text-sm font-semibold">
                <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                Outlet sudah terdaftar
              </div>
              <div v-if="req.status === 'rejected'"
                class="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2 text-red-500 text-sm font-semibold">
                <ion-icon :icon="closeCircleOutline"></ion-icon>
                Request ditolak
              </div>
            </div>
          </div>
        </div>

        <!-- ===== TAB: CABANG REQUEST ===== -->
        <div v-if="activeTab === 'cabang'">

          <!-- Filter status cabang -->
          <div class="flex justify-center gap-2 mb-4 flex-wrap">
            <button v-for="s in statusesCabang" :key="s.value" @click="filterStatusCabang = s.value" :class="filterStatusCabang === s.value
              ? 'bg-blue-500 text-white shadow-md border-blue-500'
              : 'bg-white text-gray-400 border-gray-300 hover:border-blue-300 hover:text-blue-400'"
              class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all border-2">
              {{ s.label }}
            </button>
          </div>

          <!-- Empty state cabang -->
          <div v-if="filteredCabangRequests.length === 0"
            class="flex flex-col items-center justify-center mt-20 text-gray-400">
            <ion-icon :icon="mailOpenOutline" class="text-6xl mb-3"></ion-icon>
            <p class="text-lg font-semibold">Tidak ada request</p>
            <p class="text-sm">Belum ada request cabang masuk</p>
          </div>

          <!-- List cabang request -->
          <div v-for="req in filteredCabangRequests" :key="req.id"
            class="bg-white rounded-2xl shadow-md mb-4 overflow-hidden border border-gray-100">

            <!-- Header card cabang -->
            <div :class="headerColor(req.status === 'approved' ? 'registered' : req.status)"
              class="px-4 py-3 flex justify-between items-center">
              <div>
                <span class="font-bold text-white text-base">{{ req.nama_cabang }}</span>
                <p class="text-white text-xs opacity-80">{{ req.kode_lokasi ?? '-' }}</p>
              </div>
              <span class="bg-white bg-opacity-30 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
                {{ req.status }}
              </span>
            </div>

            <!-- Body card cabang -->
            <div class="px-4 py-3 space-y-1.5">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ion-icon :icon="peopleOutline" class="text-orange-400"></ion-icon>
                <span><span class="font-semibold">Sales:</span> {{ req.nama_sales }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <ion-icon :icon="callOutline" class="text-green-400"></ion-icon>
                <span><span class="font-semibold">No HP:</span> {{ req.phone_sales ?? '-' }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <ion-icon :icon="timeOutline" class="text-gray-400"></ion-icon>
                <span>{{ formatDate(req.created_at) }}</span>
              </div>

              <!-- Approved by -->
              <div v-if="req.status === 'approved'"
                class="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2 text-green-600 text-sm font-semibold">
                <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                Disetujui oleh {{ req.approved_by_name }}
              </div>

              <!-- Rejected by -->
              <div v-if="req.status === 'rejected'"
                class="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2 text-red-500 text-sm font-semibold">
                <ion-icon :icon="closeCircleOutline"></ion-icon>
                Ditolak oleh {{ req.rejected_by_name }}
              </div>

              <!-- Catatan reject -->
              <div v-if="req.note"
                class="mt-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-600">
                <span class="font-semibold">📝 Catatan:</span> {{ req.note }}
              </div>

              <!-- Action buttons cabang -->
              <div v-if="req.status === 'pending'" class="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                <ion-button expand="block" color="success" size="small" class="flex-1 font-semibold"
                  @click="approveCabang(req.id)">
                  <ion-icon slot="start" :icon="checkmarkCircleOutline"></ion-icon>
                  Approve
                </ion-button>
                <ion-button expand="block" color="danger" size="small" class="flex-1 font-semibold"
                  @click="openRejectCabangModal(req)">
                  <ion-icon slot="start" :icon="closeCircleOutline"></ion-icon>
                  Reject
                </ion-button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ===== MODAL REJECT OUTLET ===== -->
      <ion-modal :is-open="isRejectOutletModalOpen" @didDismiss="closeRejectOutletModal">
        <ion-header>
          <ion-toolbar color="danger">
            <ion-title>Alasan Reject Outlet</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeRejectOutletModal" color="light">Tutup</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="p-4">
            <p class="text-gray-600 text-sm mb-3">
              Berikan alasan mengapa request outlet
              <span class="font-bold">{{ selectedRequest?.store_name }}</span> ditolak.
            </p>
            <ion-item lines="full" class="rounded-xl mb-4">
              <ion-label position="stacked">Alasan *</ion-label>
              <ion-textarea v-model="rejectNotes" auto-grow
                placeholder="Contoh: Data kurang lengkap, lokasi tidak sesuai area, dll..." :rows="4" />
            </ion-item>
            <ion-button expand="block" color="danger" @click="rejectRequest" class="font-semibold">
              <ion-icon slot="start" :icon="closeCircleOutline"></ion-icon>
              Kirim Penolakan
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>

      <!-- ===== MODAL REJECT CABANG ===== -->
      <ion-modal :is-open="isRejectCabangModalOpen" @didDismiss="closeRejectCabangModal">
        <ion-header>
          <ion-toolbar color="danger">
            <ion-title>Alasan Reject Cabang</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeRejectCabangModal" color="light">Tutup</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="p-4">
            <p class="text-gray-600 text-sm mb-3">
              Berikan alasan mengapa request cabang
              <span class="font-bold">{{ selectedCabangRequest?.nama_cabang }}</span>
              dari <span class="font-bold">{{ selectedCabangRequest?.nama_sales }}</span> ditolak.
            </p>
            <ion-item lines="full" class="rounded-xl mb-4">
              <ion-label position="stacked">Alasan *</ion-label>
              <ion-textarea v-model="rejectCabangNotes" auto-grow
                placeholder="Contoh: Area tidak sesuai coverage, dll..." :rows="4" />
            </ion-item>
            <ion-button expand="block" color="danger" @click="rejectCabang(selectedCabangRequest.id, rejectCabangNotes)"
              class="font-semibold">
              <ion-icon slot="start" :icon="closeCircleOutline"></ion-icon>
              Kirim Penolakan
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>

      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { alertController, IonRefresher, IonRefresherContent } from '@ionic/vue';
import HeaderSection from './../components/HeaderSection.vue';
import { API_URL } from '@/services/globalVariables';
import { refreshAccessTokenHandler } from '@/services/auth';
import { catchToast, catchToastError } from '@/services/toastHandlers';
import { presentLoading, stopLoading } from '@/services/loadingHandlers';
import {
  mailOpenOutline, personOutline, callOutline,
  businessOutline, peopleOutline, timeOutline,
  checkmarkCircleOutline, closeCircleOutline,
} from 'ionicons/icons';

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
const headers = { Authorization: `Bearer ${tokens?.access_token}` };

// ── Tab ──────────────────────────────────────────────
const activeTab = ref('outlet');

// ── Outlet Request ────────────────────────────────────
const requests = ref([]);
const filterStatus = ref('all');
const statuses = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Pending' },
  { value: 'registered', label: 'Registered' },
  { value: 'rejected', label: 'Rejected' },
];
const pendingCount = computed(() =>
  requests.value.filter(r => r.status === 'pending').length
);
const filteredRequests = computed(() => {
  if (filterStatus.value === 'all') return requests.value;
  return requests.value.filter(r => r.status === filterStatus.value);
});

// modal reject outlet
const isRejectOutletModalOpen = ref(false);
const selectedRequest = ref(null);
const rejectNotes = ref('');

// ── Cabang Request ────────────────────────────────────
const cabangRequests = ref([]);
const filterStatusCabang = ref('all');
const statusesCabang = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];
const pendingCabangCount = computed(() =>
  cabangRequests.value.filter(r => r.status === 'pending').length
);
const filteredCabangRequests = computed(() => {
  if (filterStatusCabang.value === 'all') return cabangRequests.value;
  return cabangRequests.value.filter(r => r.status === filterStatusCabang.value);
});

// modal reject cabang
const isRejectCabangModalOpen = ref(false);
const selectedCabangRequest = ref(null);
const rejectCabangNotes = ref('');

// ── Helpers ───────────────────────────────────────────
function headerColor(status) {
  if (status === 'pending') return 'bg-yellow-400';
  if (status === 'registered') return 'bg-green-500';
  if (status === 'approved') return 'bg-green-500';
  if (status === 'rejected') return 'bg-red-400';
  return 'bg-gray-400';
}
function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ── Fetch ─────────────────────────────────────────────
async function fetchRequests() {
  try {
    refreshAccessTokenHandler();
    const res = await axios.get(
      `${API_URL.value}/api/v2/outlet-request/byAS/${user.user_id}`,
      { headers }
    );
    requests.value = res.data.resource;
  } catch (e) {
    catchToastError("Gagal memuat data request outlet", 3000);
  }
}

async function fetchCabangRequests() {
  try {
    refreshAccessTokenHandler();
    const res = await axios.get(
      `${API_URL.value}/api/v2/cabang-request?status=all`,
      { headers }
    );
    // paginate → .data, non-paginate → langsung array
    cabangRequests.value = res.data.resource?.data ?? res.data.resource;
  } catch (e) {
    catchToastError("Gagal memuat data request cabang", 3000);
  }
}

// ── Outlet actions ────────────────────────────────────
async function approveRequest(id) {
  const alert = await alertController.create({
    header: 'Konfirmasi Approve',
    message: 'Outlet akan langsung terdaftar. Lanjutkan?',
    buttons: [
      { text: 'Batal', role: 'cancel' },
      {
        text: 'Approve',
        handler: async () => {
          try {
            await presentLoading();
            refreshAccessTokenHandler();
            await axios.put(
              `${API_URL.value}/api/v2/outlet-request/${id}/approve`,
              { userFullname: user.fullname, userId: user.user_id },
              { headers }
            );
            catchToast("Outlet berhasil didaftarkan!", 3000);
            fetchRequests();
          } catch (e) {
            catchToastError("Gagal approve request", 3000);
          } finally {
            stopLoading();
          }
        },
      },
    ],
  });
  await alert.present();
}

function openRejectOutletModal(req) {
  selectedRequest.value = req;
  rejectNotes.value = '';
  isRejectOutletModalOpen.value = true;
}
function closeRejectOutletModal() {
  isRejectOutletModalOpen.value = false;
  selectedRequest.value = null;
}
async function rejectRequest() {
  if (!rejectNotes.value) {
    catchToastError("Alasan reject wajib diisi!", 3000);
    return;
  }
  try {
    await presentLoading();
    refreshAccessTokenHandler();
    await axios.put(
      `${API_URL.value}/api/v2/outlet-request/${selectedRequest.value.id}/reject`,
      { notes: rejectNotes.value, userId: user.user_id },
      { headers }
    );
    catchToast("Request berhasil ditolak.", 3000);
    closeRejectOutletModal();
    fetchRequests();
  } catch (e) {
    catchToastError("Gagal reject request", 3000);
  } finally {
    stopLoading();
  }
}

// ── Cabang actions ────────────────────────────────────
async function approveCabang(id) {
  const alert = await alertController.create({
    header: 'Konfirmasi Approve',
    message: 'Cabang akan ditambahkan ke area coverage sales. Lanjutkan?',
    buttons: [
      { text: 'Batal', role: 'cancel' },
      {
        text: 'Approve',
        handler: async () => {
          try {
            await presentLoading();
            refreshAccessTokenHandler();
            await axios.patch(
              `${API_URL.value}/api/v2/cabang-request/${id}/approve`,
              {
                userFullname: user.fullname,
                userId: user.user_id
              },
              { headers }
            );
            catchToast("Request cabang berhasil diapprove!", 3000);
            fetchCabangRequests();
          } catch (e) {
            catchToastError(e.response?.data?.message ?? "Gagal approve.", 3000);
          } finally {
            stopLoading();
          }
        },
      },
    ],
  });
  await alert.present();
}

function openRejectCabangModal(req) {
  selectedCabangRequest.value = req;
  rejectCabangNotes.value = '';
  isRejectCabangModalOpen.value = true;
}
function closeRejectCabangModal() {
  isRejectCabangModalOpen.value = false;
  selectedCabangRequest.value = null;
}
async function rejectCabang(id, note) {
  if (!note) {
    catchToastError("Alasan reject wajib diisi!", 3000);
    return;
  }
  try {
    await presentLoading();
    refreshAccessTokenHandler();
    await axios.patch(
      `${API_URL.value}/api/v2/cabang-request/${id}/reject`,
      {
        note,
        userFullname: user.fullname,
        userId: user.user_id
      },
      { headers }
    );
    catchToast("Request cabang berhasil ditolak.", 3000);
    closeRejectCabangModal();
    fetchCabangRequests();
  } catch (e) {
    catchToastError(e.response?.data?.message ?? "Gagal reject.", 3000);
  } finally {
    stopLoading();
  }
}

const handleRefresh = (event) => {
  Promise.all([fetchRequests(), fetchCabangRequests()])
    .finally(() => setTimeout(() => event.target.complete(), 1000));
};

onMounted(() => {
  fetchRequests();
  fetchCabangRequests();
});
</script>

<style scoped>
.container {
  margin-top: 28%;
  flex-direction: column;
}
</style>