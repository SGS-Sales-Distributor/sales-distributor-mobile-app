<template>
  <ion-page>
    <HeaderSection />
    <ion-content :fullscreen="true">
      <!-- Header -->

      <div class="container">
        <div class="relative overflow-x-auto">
          <div class="py-2 rounded-lg max-w-sm-full w-full">
            <h2 class="text-2xl font-semibold text-center mb-4">Daftar Toko</h2>
            <ion-searchbar :debounce="300" @ionInput="searchStoreHandler" placeholder="Cari nama toko..."
              color="light"></ion-searchbar>
            <div v-for="(store, index) in filteredStores" :key="index + 1" class="relative overflow-x-auto">
              <ion-card class="py-2 bg-lime-500">
                <ion-card-header class="bg-gray-50">
                  <div class="flex flex-col w-full h-full space-y-2">
                    <!-- Store Details -->
                    <div class="flex flex-row w-full h-full justify-between space-x-2">
                      <label class="flex-initial w-56 font-semibold">Nama Toko</label>
                      <p class="flex-initial w-44 text-right">{{ store.store_name }}</p>
                    </div>
                    <div class="flex flex-row w-full h-full justify-between space-x-2">
                      <label class="flex-initial w-56 font-semibold">Alamat Toko</label>
                      <p class="flex-initial w-44 text-right">{{ store.store_address }}</p>
                    </div>
                    <div class="flex flex-row w-full h-full justify-between space-x-2">
                      <label class="flex-initial w-56 font-semibold">Nomor Handphone</label>
                      <p class="flex-initial w-44 text-right">{{ store.store_phone }}</p>
                    </div>
                    <div class="flex flex-row w-full h-full justify-between space-x-2">
                      <label class="flex-initial w-56 font-semibold">Nama Pemilik Utama</label>
                      <p class="flex-initial w-44 text-right">{{ store.owner }}</p>
                    </div>
                    <div class="flex flex-row w-full h-full justify-between space-x-2"
                      v-if="store.owner && store.owner.length">
                      <label class="flex-initial w-56 font-semibold">NIK Pemilik Utama</label>
                      <p class="flex-initial w-44 text-right">{{ store.nik_owner }}</p>
                    </div>
                    <div class="flex flex-row w-full h-full justify-between space-x-2"
                      v-if="store.owner && store.owner.length">
                      <label class="flex-initial w-56 font-semibold">Email Pemilik Utama</label>
                      <p class="flex-initial w-44 text-right">{{ store.email_owner }}</p>
                    </div>
                    <div class="flex flex-row w-full h-full justify-between space-x-2">
                      <label class="flex-initial w-56 font-semibold">Credit Limit</label>
                      <p class="flex-initial w-44 text-right">
                        <!-- Rp. {{ new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(store.credit_limit) }} -->
                        Rp. {{ new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(0) }}
                      </p>
                    </div>
                  </div>
                </ion-card-header>
                <ion-card-content class="bg-gray-50">
                  <div class="flex w-full justify-center items-center px-4 pb-2 space-x-4">
                    <!-- Edit Button -->
                    <ion-button shape="round" color="primary" @click="openEditModal(store)"><ion-icon slot="start" :icon="createSharp"></ion-icon> Edit</ion-button>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>
            <ion-infinite-scroll @ionInfinite="ionInfinite">
              <ion-infinite-scroll-content loading-text="Load more stores..."
                loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <ion-modal :is-open="isEditModalOpen" @didDismiss="closeEditModal">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Edit Store</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeEditModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding form-container">
          <ion-item class="form-item">
            <ion-label position="stacked">Nama Toko</ion-label>
            <ion-input v-model="selectedStore.nama_toko" placeholder="Masukkan Nama Toko"></ion-input>
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="stacked">Alamat Toko</ion-label>
            <ion-input v-model="selectedStore.alamat_toko" placeholder="Masukkan Alamat Toko"></ion-input>
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="stacked">Nomor Handphone</ion-label>
            <ion-input v-model="selectedStore.nomor_telepon_toko" placeholder="Masukkan Nomor Handphone"></ion-input>
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="stacked">Nama Pemilik Utama</ion-label>
            <ion-input v-model="selectedStore.owner" placeholder="Masukkan Nama Pemilik Utama"></ion-input>
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="stacked">NIK Pemilik Utama</ion-label>
            <ion-input v-model="selectedStore.nik_owner" placeholder="Masukkan NIK Pemilik Utama"></ion-input>
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="stacked">Email Pemilik Utama</ion-label>
            <ion-input v-model="selectedStore.email_owner" placeholder="Masukkan Email Pemilik Utama"></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-label position="stacked" aria-readonly="">Credit Limit</ion-label>
            <ion-input :value="formattedCreditLimit" @ionInput="handleCreditLimitInput" type="text"
              placeholder="Masukkan Credit Limit" readonly></ion-input>
          </ion-item>
          <div class="ion-padding">
            <ion-button expand="block" color="primary" @click="saveStoreChanges"><ion-icon slot="start" :icon="checkmarkCircleSharp"></ion-icon> Save</ion-button>
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
import axios from "axios";
import { createSharp,checkmarkCircleSharp } from "ionicons/icons";
import HeaderSection from "./../components/HeaderSection.vue";
import { API_URL, currentRoute } from "@/services/globalVariables";
import { computed, onMounted, ref } from "vue";
import { refreshAccessTokenHandler } from "@/services/auth";
import { useRoute } from "vue-router";
import { catchToast, catchToastError } from "@/services/toastHandlers";
import { IonRefresher, IonRefresherContent } from "@ionic/vue";

const route = useRoute();
const currentPageRouteName = computed(() => route.name);

const storesData = ref([]);
const selectedStore = ref({ credit_limit: null });
const isEditModalOpen = ref(false);
const lastIndex = ref(20);
const searchQuery = ref("");
const user_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const formattedCreditLimit = computed(() => {
  if (selectedStore.value.credit_limit) {
    return `Rp. ${new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(selectedStore.value.credit_limit)}`;
  }
  return "";
});

const filteredStores = computed(() => {
  if (!searchQuery.value) {
    return storesData.value.slice(0, lastIndex.value);
  }
  return storesData.value.filter((store) =>
    store.store_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function searchStoreHandler(event) {
  searchQuery.value = event.target.value;
}

const ionInfinite = (event) => {
  if (filteredStores.value.length > lastIndex.value) {
    setTimeout(() => {
      lastIndex.value += 5;
      event.target.complete();
    }, 1000);
  } else {
    event.target.disabled = true;
  }
};

function handleCreditLimitInput(event) {
  const value = event.target.value.replace(/[^0-9]/g, "");
  selectedStore.value.credit_limit = Number(value);
}

async function fetchStoresData() {
  try {
    refreshAccessTokenHandler();

    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    // const response = await axios.get(`${API_URL.value}/api/v2/stores`, { headers });
    const response = await axios.get(`${API_URL.value}/api/v2/storesByUser/${user_id.user_id}`, { headers });
    storesData.value = response.data.resource;
  } catch (error) {
    console.error("Failed to fetch store data.", error);
  }
}

const handleRefresh = () => {
  window.location.reload();
  setTimeout(() => {
    event.target.complete();
  }, 1000);
};

function openEditModal(store) {
  const userId = localStorage.getItem("user_id");
  selectedStore.value = {
    store_id: store.store_id,
    nama_toko: store.store_name,
    alamat_toko: store.store_address,
    nomor_telepon_toko: store.store_phone,
    owner: store.owner || "",
    nik_owner: store.nik_owner || "",
    email_owner: store.email_owner || "",
    credit_limit: "0",
    user_id: userId,
  };
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}

async function saveStoreChanges() {
  try {
    const tokens = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    };

    const post = {
      store_name: selectedStore.value.nama_toko,
      store_alias: selectedStore.value.nama_toko,
      store_address: selectedStore.value.alamat_toko,
      store_phone: selectedStore.value.nomor_telepon_toko,
      owner: selectedStore.value.owner,
      nik_owner: selectedStore.value.nik_owner || "",
      email_owner: selectedStore.value.email_owner || "",
      credit_limit: selectedStore.value.credit_limit,
      updated_by: user_id.fulname
    };

    const response = await axios.put(`${API_URL.value}/api/v2/stores/${selectedStore.value.store_id}`, post, { headers });
    closeEditModal();
    fetchStoresData();
    catchToast(response.data.message, 3000)
  } catch (error) {
    if (error.response && error.response.data.status == 401) {
      catchToastError(error.response.data.message, 3000);
    } else {
      catchToastError("Gagal Mengedit Data Toko", 3000);
      console.error(error.response);
    }
  }
}

onMounted(() => {
  fetchStoresData();
});
</script>

<style scoped>
.container {
  margin-top: 28%;
  position: flex;
  flex-direction: column;
}
</style>
